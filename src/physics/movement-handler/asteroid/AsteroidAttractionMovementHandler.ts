import MovementHandlerInterface from '../MovementHandlerInterface';
import Storage from '../../../storage/Storage';
import config from '../../../config';
import performGravityAttraction from '../../utils/performGravityAttraction';
import isCirclesIntersect from '../../utils/isCirclesIntersect';
import Player from '../../../player/Player';

class AsteroidAttractionMovementHandler implements MovementHandlerInterface {
  private storage: Storage;

  public constructor(storage: Storage) {
    this.storage = storage;
  }

  public handle(player: Player): void {
    const playerData = player.playerData;

    for (const asteroidData of Object.values(this.storage.worldData.asteroidsData)) {
      const intersectCircle = {
        x: asteroidData.x,
        y: asteroidData.y,
        r: asteroidData.r * config.asteroidAttractionRadiusMultiplier,
      };

      if (!isCirclesIntersect(playerData, intersectCircle)) {
        continue;
      }

      if (asteroidData.r > playerData.r) {
        performGravityAttraction(playerData, asteroidData);
      } else {
        performGravityAttraction(asteroidData, playerData);
      }
    }
  }
}

export default AsteroidAttractionMovementHandler;
