import Storage from './server/storage';
import Physics from './player/physics/Physics';
import { PlayerData } from './player/PlayerData';
import Player from './player/Player';
import config from './config';

class Game {
  private storage: Storage;
  private physics: Physics;

  constructor(storage, physics) {
    this.storage = storage;
    this.physics = physics;
  }

  public addPlayer() {
    // TODO: demo data, update with something like rand place generating
    const playerData = new PlayerData(2600, 1500, Math.random() * 100 + 50);
    const player = new Player(playerData, this.physics);

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
