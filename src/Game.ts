import Storage from './storage/Storage';
import PlayerData from './storage/PlayerData';
import config from './config';
import PlayerFactory from './player/PlayerFactory';
import calculateAcceleration from './physics/utils/calculateAcceleration';
import AsteroidData from './storage/AsteroidData';
import {genId, randInt} from './utils';
import KeysPressState from './server/KeysPressState';
import Player from './player/Player';

class Game {
  private readonly storage: Storage;
  private readonly playerFactory: PlayerFactory;

  constructor(storage: Storage, playerFactory: PlayerFactory) {
    this.storage = storage;
    this.playerFactory = playerFactory;
  }

  public addPlayerOnRandomPosition(username: string) {
    const r = config.initPlayerSize;
    const interactionR = r * config.relativeZonesSizes[2];
    const position = this.storage.generateRandomPosition(interactionR);

    return this.addPlayer(username, position.x, position.y, r);
  }

  public addAsteroidDataOnRandomPosition() {
    const r = randInt(config.minAsteroidSize, config.maxAsteroidSize);
    const interactionR = r * config.asteroidAttractionRadiusMultiplier;
    const position = this.storage.generateRandomPosition(interactionR);
    this.addAsteroidData(genId(), position.x, position.y, r);
  }

  public startGameLoop() {
    setInterval(() => {
      for (const [, player] of this.storage.players) {
        player.updateData();
      }
    }, config.dt);

    this.registerEventHandlers();
  }

  private registerEventHandlers() {
    this.storage
      .on(Storage.UPDATE_KEY_PRESS_STATE, (
        player: Player,
        oldKeysPressState: KeysPressState,
        newKeysPressState: KeysPressState,
      ) => {
        const acceleration = calculateAcceleration(player, oldKeysPressState, newKeysPressState);
        const isAttenuationX = !newKeysPressState.left && !newKeysPressState.right;
        const isAttenuationY = !newKeysPressState.down && !newKeysPressState.up;
        player.setAcceleration(acceleration, isAttenuationX, isAttenuationY);

        if (newKeysPressState.space) {
          player.accelerateReactively();
        }
      })

      .on(Storage.REMOVE_ASTEROID, () => {
        this.addAsteroidDataOnRandomPosition();
      })
    ;
  }

  private addAsteroidData(id: string, x: number, y: number, r: number) {
    const asteroidData = new AsteroidData(id, x, y, r);
    this.storage.addAsteroidData(asteroidData);
  }

  private addPlayer(username: string, x: number, y: number, r: number) {
    const playerData = new PlayerData(username, x, y, r);
    const player = this.playerFactory.createPlayer(playerData);
    this.storage.addPlayer(playerData.id, player);

    return player;
  }
}

export default Game;
