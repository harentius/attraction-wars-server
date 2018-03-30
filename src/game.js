const { PlayerData } = require('./player/PlayerData');
const Player = require('./player/Player');
const config = require('./config');

class Game {
  constructor(storage) {
    this._storage = storage;
  }

  addPlayer() {
    // TODO: demo data, update with something like rand place generating
    const playerData = new PlayerData(1500, 400, 50);
    const player = new Player(playerData);

    this._storage.addPlayer(playerData.id, player);

    return player;
  }

  startGameLoop() {
    setInterval(() => {
      for (const [, player] of this._storage.players) {
        player.updateData();
      }
    }, config.dt);
  }
}

module.exports = Game;
