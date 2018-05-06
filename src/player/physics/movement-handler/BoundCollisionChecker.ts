import config from '../../../config';
import PlayerData from '../../PlayerData';

class BoundCollisionChecker {
  public isXBoundCollision(playerData: PlayerData) {
    return (playerData.x < (config.worldBounds[0] + playerData.r))
        ||
      (playerData.x > (config.worldBounds[2] - playerData.r))
    ;
  }

  public isYBoundCollision(playerData: PlayerData) {
    return (playerData.y < (config.worldBounds[1] + playerData.r))
        ||
      (playerData.y > (config.worldBounds[3] - playerData.r))
    ;
  }
}

export default BoundCollisionChecker;
