import Storage from './storage/Storage';
import PlayerData from './storage/PlayerData';
import config from './config';
import PlayerFactory from './player/PlayerFactory';

class Game {
  private readonly storage: Storage;
  private readonly playerFactory: PlayerFactory;

  constructor(storage: Storage, playerFactory: PlayerFactory) {
    this.storage = storage;
    this.playerFactory = playerFactory;
  }

  public addPlayer(username, x = 2600, y = 1500, r = Math.random() * 100 + 100) {
    // TODO: demo data, update with something like rand place generating
    const playerData = new PlayerData(username, x, y, r);
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
