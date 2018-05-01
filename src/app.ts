import worldData from './world/getWorldData';
import Game from './game';
import Storage from './server/storage';
import Physics from './player/physics/Physics';
import calculateAcceleration from './player/physics/calculateAcceleration';

const storage = new Storage(worldData);
const physics = new Physics(storage);
const game = new Game(storage, physics);
game.startGameLoop();

storage.on(Storage.UPDATE_KEY_PRESS_STATE, (player, oldKeysPressState, newKeysPressState) => {
  const acceleration = calculateAcceleration(player, oldKeysPressState, newKeysPressState);
  player.setAcceleration(acceleration, !newKeysPressState.isAnyMoveKeyPressed());
});

export { game, storage };
