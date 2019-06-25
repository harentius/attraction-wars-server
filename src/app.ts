import config from './config';
import WorldData from './storage/WorldData';
import Game from './Game';
import Storage from './storage/Storage';
import InteractionZoneSwitcher from './physics/movement-handler/interaction-zone/InteractionZoneSwitcher';
import MovementHandlerRegistryFactory from './physics/movement-handler/MovementHandlerRegistryFactory';
import PlayerFactory from './player/PlayerFactory';

const worldData = new WorldData(
  config.relativeZonesSizes,
  config.worldBounds,
  config.asteroidAttractionRadiusMultiplier,
);
const storage = new Storage(worldData);

const movementHandlerRegistryFactory = new MovementHandlerRegistryFactory(storage);
const movementHandlerRegistry = movementHandlerRegistryFactory.createMovementHandlerRegistry();
const interactionZoneSwitcher = new InteractionZoneSwitcher(storage, movementHandlerRegistry);
const playerFactory = new PlayerFactory(interactionZoneSwitcher, movementHandlerRegistry);

const game = new Game(storage, playerFactory);
game.startGameLoop();

// TODO: demo data
game.addPlayer('demo_player1', 1650, 1650, 100);
game.addAsteroidData('demo_asteroid1', 2800, 1700, 30);
game.addAsteroidData('demo_asteroid2', 2350, 1750, 80);

export { game, storage };
