// Configurable parameters
const worldWidth = +process.env.WORLD_WIDTH || 15000;
const worldHeight = +process.env.WORLD_HEIGHT || 15000;
const asteroidsDensity = (+process.env.ASTEROIDS_DENSITY || 1.25) * 1e-06;
const port = +process.env.PORT || 4000;

const config: {
  port: number,
  broadCastPeriod: number,
  dt: number,
  worldBounds: number[],
  keyPressDv: number,
  releaseDv: number,
  gravityAssistReleaseDv: number,
  rotationSpeed: number,
  gravityAssistRotationSpeed: number,
  attractionSpeed: number,
  asteroidAttractionSpeed: number,
  asteroidAttractionRadiusMultiplier: number,
  minSpeed: number,
  maxMovementSpeed: number,
  relativeZonesSizes: number[],
  considerStoppedWhen: number,
  bindViscosity: number,
  reactiveVAttenuation: number,
  reactiveVMultiplier: number,
  reactiveVRLossMultiplier: number,
  minimumR: number,
  initAsteroidsAmount: number,
  minAsteroidSize: number,
  maxAsteroidSize: number,
  initPlayerSize: number,
  serverStatisticsBroadCastPeriod: number,
  maxPlayers: number,
  heartbeatWaitTime: number,
  tooBigMultiplier: number,
} = {
  port,

  // Game-level configuration. Most Likely often changeable (per game round?)
  worldBounds: [0, 0, worldWidth, worldHeight],
  initAsteroidsAmount: worldWidth * worldHeight * asteroidsDensity,

  // Kind of unchangeable parameters
  broadCastPeriod: 30,
  dt: 15, // game loop interval in ms
  keyPressDv: 0.00025,
  releaseDv: 0.0005,
  gravityAssistReleaseDv: 0.0001,
  rotationSpeed: 0.00025,
  gravityAssistRotationSpeed: 0.003,
  attractionSpeed: 30,
  asteroidAttractionSpeed: 50,
  asteroidAttractionRadiusMultiplier: 4,
  minSpeed: 0,
  maxMovementSpeed: 0.2,
  relativeZonesSizes: [2.5, 3.5, 4.5],
  considerStoppedWhen: 0,
  bindViscosity: 0.05,
  reactiveVAttenuation: 0.99,
  reactiveVMultiplier: 3,
  reactiveVRLossMultiplier: 0.95,
  minimumR: 30,
  minAsteroidSize: 10,
  maxAsteroidSize: 100,
  initPlayerSize: 50,
  serverStatisticsBroadCastPeriod: 1000,
  maxPlayers: 50,
  heartbeatWaitTime: 60000,
  tooBigMultiplier: 1.0 / 20.0,
};

// calculated parameters
config.considerStoppedWhen = Math.min(config.releaseDv, config.keyPressDv) / 2;

export default config;
