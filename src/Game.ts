import Storage from './server/storage';
import { PlayerData } from './player/PlayerData';
import config from './config';
import PlayerFactory from './player/PlayerFactory';

class Game {
  private readonly storage: Storage;
  private readonly playerFactory: PlayerFactory;

  constructor(storage: Storage, playerFactory: PlayerFactory) {
    this.storage = storage;
    this.playerFactory = playerFactory;
  }

  public addPlayer() {
    // TODO: demo data, update with something like rand place generating
    const playerData = new PlayerData(2600, 1500, Math.random() * 100 + 50);
    const player = this.playerFactory.createPlayer(playerData);
    this.storage.addPlayer(playerData.id, player);

    return player;
  }

  public startGameLoop() {
    setInterval(() => {
      for (const [, player] of this.storage.players) {
        player.updateData();
      }
    }, config.dt);
  }
}

export default Game;
