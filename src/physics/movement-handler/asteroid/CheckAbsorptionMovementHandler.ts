import MovementHandlerInterface from '../MovementHandlerInterface';
import PlayerData from '../../../storage/PlayerData';
import Storage from '../../../storage/Storage';
import isCirclesIntersect from '../../utils/isCirclesIntersect';

class CheckAbsorptionMovementHandler implements MovementHandlerInterface {
  private storage: Storage;

  public constructor(storage: Storage) {
    this.storage = storage;
  }

  public updatePlayerData(playerData: PlayerData): void {
    for (const asteroidData of Object.values(this.storage.worldData.asteroidsData)) {
      if (!isCirclesIntersect(asteroidData, playerData)) {
        continue;
      }

      playerData.r = Math.sqrt(Math.pow(playerData.r, 2) + Math.pow(asteroidData.r, 2));
      this.storage.removeAsteroidData(asteroidData.id);
    }
  }
}

export default CheckAbsorptionMovementHandler;
