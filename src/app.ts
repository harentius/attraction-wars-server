import config from './config';
import WorldData from './storage/WorldData';
import Game from './Game';
import Storage from './storage/Storage';
import InteractionZoneSwitcher from './physics/movement-handler/interaction-zone/InteractionZoneSwitcher';
import MovementHandlerRegistryFactory from './physics/movement-handler/MovementHandlerRegistryFactory';
import PlayerFactory from './player/PlayerFactory';
import ServerStatistics from './storage/ServerStatistics';
import * as logger from 'winston';

const worldData = new WorldData(
  config.relativeZonesSizes,
  config.worldBounds,
  config.asteroidAttractionRadiusMultiplier,
  new ServerStatistics(),
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
game.addPlayer('demo_player2', 1950, 1650, 50);

try {
  for (let i = 0; i < config.initAsteroidsAmount; i++) {
    game.addAsteroidDataOnRandomPosition();
  }
} catch (e) {
  logger.warn(e.message);
}

export { game, storage };
