import MovementHandlerInterface from '../MovementHandlerInterface';
import Storage from '../../../storage/Storage';
import PlayerData from '../../../storage/PlayerData';
import config from '../../../config';
import performGravityAttraction from '../../utils/performGravityAttraction';
import isCirclesIntersect from '../../utils/isCirclesIntersect';

class AsteroidAttractionMovementHandler implements MovementHandlerInterface {
  private storage: Storage;

  public constructor(storage: Storage) {
    this.storage = storage;
  }

  public updatePlayerData(playerData: PlayerData): void {
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
