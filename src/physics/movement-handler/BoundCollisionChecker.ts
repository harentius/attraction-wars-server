import config from '../../config';
import PlayerData from '../../storage/PlayerData';

class BoundCollisionChecker {
  public isBoundCollision(playerData: PlayerData) {
    return this.isXBoundCollision(playerData) || this.isYBoundCollision(playerData);
  }

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
