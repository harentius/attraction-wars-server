import MovementHandlerInterface from '../MovementHandlerInterface';
import Storage from '../../../storage/Storage';
import isCirclesIntersect from '../../utils/isCirclesIntersect';
import Player from '../../../player/Player';

class CheckAbsorptionMovementHandler implements MovementHandlerInterface {
  private storage: Storage;

  public constructor(storage: Storage) {
    this.storage = storage;
  }

  public handle(player: Player): void {
    const playerData = player.playerData;

    for (const asteroidData of Object.values(this.storage.worldData.asteroidsData)) {
      if (playerData.r < asteroidData.r) {
        continue;
      }

      if (!isCirclesIntersect(asteroidData, playerData)) {
        continue;
      }

      playerData.r = Math.sqrt(Math.pow(playerData.r, 2) + Math.pow(asteroidData.r, 2));
      player.increaseScoreByAsteroidAbsorption(asteroidData);
      this.storage.removeAsteroidData(asteroidData.id);
    }
  }
}

export default CheckAbsorptionMovementHandler;
