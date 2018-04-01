const worldData = require('./world/getWorldData');
const Game = require('./game');
const Storage = require('./server/storage');
const Physics = require('./player/physics/Physics');
const calculateAcceleration = require('./player/physics/calculateAcceleration');

const storage = new Storage(worldData);
const physics = new Physics(storage);
const game = new Game(storage, physics);
game.startGameLoop();

storage.on(Storage.UPDATE_KEY_PRESS_STATE, (player, oldKeysPressState, newKeysPressState) => {
  const acceleration = calculateAcceleration(player, oldKeysPressState, newKeysPressState);
  player.setAcceleration(acceleration, !newKeysPressState.isAnyMoveKeyPressed());
});

module.exports = { game, storage };
