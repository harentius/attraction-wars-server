import config from './config';
import PlayerData from './player/PlayerData';
import { generateRandomColor } from './utils';
import WorldData from './world/WorldData';
import Game from './Game';
import Storage from './server/storage';
import InteractionZoneSwitcher from './player/physics/InteractionZoneSwitcher';
import calculateAcceleration from './player/physics/calculateAcceleration';
import MovementHandlerRegistryFactory from './player/physics/movement-handler/MovementHandlerRegistryFactory';
import PlayerFactory from './player/PlayerFactory';

const playersData = {
  demo_player1: new PlayerData('demo_player1', 1650, 1650, 200, 'demo_player1', generateRandomColor())
};
const worldData = new WorldData(config.relativeZonesSizes, playersData, config.worldBounds);
const storage = new Storage(worldData);

const movementHandlerRegistryFactory = new MovementHandlerRegistryFactory();
const movementHandlerRegistry = movementHandlerRegistryFactory.createMovementHandlerRegistry();
const interactionZoneSwitcher = new InteractionZoneSwitcher(storage, movementHandlerRegistry);
const playerFactory = new PlayerFactory(interactionZoneSwitcher, movementHandlerRegistry);

const game = new Game(storage, playerFactory);
game.startGameLoop();

storage.on(Storage.UPDATE_KEY_PRESS_STATE, (player, oldKeysPressState, newKeysPressState) => {
  const acceleration = calculateAcceleration(player, oldKeysPressState, newKeysPressState);
  player.setAcceleration(acceleration, !newKeysPressState.isAnyMoveKeyPressed());
});

export { game, storage };
