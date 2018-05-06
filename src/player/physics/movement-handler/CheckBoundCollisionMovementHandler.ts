import MovementHandlerInterface from './MovementHandlerInterface';
import PlayerData from '../../PlayerData';
import BoundCollisionChecker from './BoundCollisionChecker';

class CheckBoundCollisionMovementHandler implements MovementHandlerInterface {
  private boundCollisionChecker: BoundCollisionChecker;

  public constructor() {
    this.boundCollisionChecker = new BoundCollisionChecker();
  }

  public updatePlayerData(playerData: PlayerData): void {
    if (this.boundCollisionChecker.isXBoundCollision(playerData)) {
      playerData.vX *= -1;
    }

    if (this.boundCollisionChecker.isYBoundCollision(playerData)) {
      playerData.vY *= -1;
    }
  }

  public getName(): string {
    return 'check_bound_collision_movement_handler';
  }
}

export default CheckBoundCollisionMovementHandler;
