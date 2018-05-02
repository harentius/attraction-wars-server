import worldData from './world/getWorldData';
import Game from './Game';
import Storage from './server/storage';
import InteractionZoneSwitcher from './player/physics/InteractionZoneSwitcher';
import calculateAcceleration from './player/physics/calculateAcceleration';
import MovementHandlerRegistryFactory from './player/physics/movement-handler/MovementHandlerRegistryFactory';
import PlayerFactory from './player/PlayerFactory';

const movementHandlerRegistryFactory = new MovementHandlerRegistryFactory();

const movementHandlerRegistry = movementHandlerRegistryFactory.createMovementHandlerRegistry();
const storage = new Storage(worldData);
const interactionZoneSwitcher = new InteractionZoneSwitcher(storage, movementHandlerRegistry);
const playerFactory = new PlayerFactory(interactionZoneSwitcher, movementHandlerRegistry);

const game = new Game(storage, playerFactory);
game.startGameLoop();

storage.on(Storage.UPDATE_KEY_PRESS_STATE, (player, oldKeysPressState, newKeysPressState) => {
  const acceleration = calculateAcceleration(player, oldKeysPressState, newKeysPressState);
  player.setAcceleration(acceleration, !newKeysPressState.isAnyMoveKeyPressed());
});

export { game, storage };
