import MovementHandlerInterface from './MovementHandlerInterface';
import PlayerData from '../../PlayerData';
import BoundCollisionChecker from './BoundCollisionChecker';

class CheckBoundCollisionMovementHandler implements MovementHandlerInterface {
  private boundCollisionChecker: BoundCollisionChecker;

  public constructor() {
    this.boundCollisionChecker = new BoundCollisionChecker();
  }

  public updatePlayerData(playerData: PlayerData): void {
    if (!this.boundCollisionChecker.isBoundCollision(playerData)) {
      return;
    }

    if (this.boundCollisionChecker.isXBoundCollision(playerData)) {
      playerData.vX *= -1;
      playerData.bonusVx *= -1;
    }

    if (this.boundCollisionChecker.isYBoundCollision(playerData)) {
      playerData.vY *= -1;
      playerData.bonusVy *= -1;
    }

    for (const rotationData of playerData.rotationData.values()) {
      rotationData.direction *= -1;
    }

    for (const gravityAssistData of playerData.gravityAssistData.values()) {
      gravityAssistData.direction *= -1;
    }
  }

  public getName(): string {
    return 'check_bound_collision_movement_handler';
  }
}

export default CheckBoundCollisionMovementHandler;
