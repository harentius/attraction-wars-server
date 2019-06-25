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
} = {
  port: 4000,
  broadCastPeriod: 30,
  dt: 10,
  worldBounds: [0, 0, 20000, 20000],
  keyPressDv: 0.00025,
  releaseDv: 0.0005,
  gravityAssistReleaseDv: 0.0001,
  rotationSpeed: 0.00025,
  gravityAssistRotationSpeed: 0.003,
  attractionSpeed: 20,
  asteroidAttractionSpeed: 50,
  asteroidAttractionRadiusMultiplier: 4,
  minSpeed: 0,
  maxMovementSpeed: 0.2,
  relativeZonesSizes: [2.5, 3.5, 4.5],
  considerStoppedWhen: 0,
  bindViscosity: 0.05,
};

// calculated parameter
config.considerStoppedWhen = Math.min(config.releaseDv, config.keyPressDv) / 2;

export default config;
