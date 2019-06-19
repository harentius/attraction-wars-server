import config from './config';
import WorldData from './storage/WorldData';
import Game from './Game';
import Storage from './storage/storage';
import InteractionZoneSwitcher from './physics/movement-handler/interaction-zone/InteractionZoneSwitcher';
import calculateAcceleration from './physics/calculateAcceleration';
import MovementHandlerRegistryFactory from './physics/movement-handler/MovementHandlerRegistryFactory';
import PlayerFactory from './player/PlayerFactory';

const worldData = new WorldData(config.relativeZonesSizes, config.worldBounds);
const storage = new Storage(worldData);

const movementHandlerRegistryFactory = new MovementHandlerRegistryFactory();
const movementHandlerRegistry = movementHandlerRegistryFactory.createMovementHandlerRegistry();
const interactionZoneSwitcher = new InteractionZoneSwitcher(storage, movementHandlerRegistry);
const playerFactory = new PlayerFactory(interactionZoneSwitcher, movementHandlerRegistry);

const game = new Game(storage, playerFactory);
game.startGameLoop();

// demo
game.addPlayer('demo_player1', 1650, 1650, 50);

storage.on(Storage.UPDATE_KEY_PRESS_STATE, (player, oldKeysPressState, newKeysPressState) => {
  const acceleration = calculateAcceleration(player, oldKeysPressState, newKeysPressState);
  player.setAcceleration(acceleration, !newKeysPressState.isAnyMoveKeyPressed());
});

export { game, storage };
