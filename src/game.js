const { PlayerData } = require('./player/PlayerData');
const Player = require('./player/Player');
const config = require('./config');

class Game {
  constructor(storage, physics) {
    this._storage = storage;
    this._physics = physics;
  }

  addPlayer() {
    // TODO: demo data, update with something like rand place generating
    const playerData = new PlayerData(1500, 400, Math.random() * 100 + 50);
    const player = new Player(playerData, this._physics);

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
