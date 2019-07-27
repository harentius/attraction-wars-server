import config from '../../../config';
import PlayerData from '../../../storage/PlayerData';

class BoundCollisionChecker {
  public isBoundCollision(playerData: PlayerData): boolean {
    return this.isXBoundCollision(playerData) || this.isYBoundCollision(playerData);
  }

  public isXBoundCollision(playerData: PlayerData): boolean {
    return this.isXLeftBoundCollision(playerData)
        ||
      this.isXRightBoundCollision(playerData)
    ;
  }

  public isYBoundCollision(playerData: PlayerData): boolean {
    return this.isYLeftBoundCollision(playerData)
        ||
      this.isYRightBoundCollision(playerData)
    ;
  }

  public isXLeftBoundCollision(playerData: PlayerData): boolean {
    return playerData.x < (config.worldBounds[0] + playerData.r);
  }

  public isXRightBoundCollision(playerData: PlayerData): boolean {
    return playerData.x > (config.worldBounds[2] - playerData.r);
  }

  public isYLeftBoundCollision(playerData: PlayerData): boolean {
    return playerData.y < (config.worldBounds[1] + playerData.r);
  }

  public isYRightBoundCollision(playerData: PlayerData) {
    return playerData.y > (config.worldBounds[3] - playerData.r);
  }
}

export default BoundCollisionChecker;
