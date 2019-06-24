import Storage from './storage/Storage';
import PlayerData from './storage/PlayerData';
import config from './config';
import PlayerFactory from './player/PlayerFactory';
import calculateAcceleration from './physics/utils/calculateAcceleration';
import AsteroidData from './storage/AsteroidData';

class Game {
  private readonly storage: Storage;
  private readonly playerFactory: PlayerFactory;

  constructor(storage: Storage, playerFactory: PlayerFactory) {
    this.storage = storage;
    this.playerFactory = playerFactory;
  }

  public addPlayer(username: string, x: number = 2600, y: number = 1500, r: number = Math.random() * 100 + 10) {
    // TODO: demo data, update with something like rand place generating
    const playerData = new PlayerData(username, x, y, r);
    const player = this.playerFactory.createPlayer(playerData);
    this.storage.addPlayer(playerData.id, player);

    return player;
  }

  public addAsteroidData(id: string, x: number, y: number, r: number = Math.random() * 10) {
    // TODO: demo data, update with something like rand place generating
    const asteroidData = new AsteroidData(id, x, y, r);
    this.storage.worldData.addAsteroidData(asteroidData);
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
    this.storage.on(Storage.UPDATE_KEY_PRESS_STATE, (player, oldKeysPressState, newKeysPressState) => {
      const acceleration = calculateAcceleration(player, oldKeysPressState, newKeysPressState);
      const isAnyMoveKeyPressed = newKeysPressState.isAnyMoveKeyPressed();
      player.setAcceleration(acceleration, !isAnyMoveKeyPressed, isAnyMoveKeyPressed);
    });
  }
}

export default Game;
