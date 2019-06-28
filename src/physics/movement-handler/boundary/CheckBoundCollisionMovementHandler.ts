import MovementHandlerInterface from '../MovementHandlerInterface';
import BoundCollisionChecker from './BoundCollisionChecker';
import Player from '../../../player/Player';

class CheckBoundCollisionMovementHandler implements MovementHandlerInterface {
  private boundCollisionChecker: BoundCollisionChecker;

  public constructor() {
    this.boundCollisionChecker = new BoundCollisionChecker();
  }

  public handle(player: Player): void {
    const playerData = player.playerData;

    if (!this.boundCollisionChecker.isBoundCollision(playerData)) {
      return;
    }

    if (this.boundCollisionChecker.isXBoundCollision(playerData)) {
      playerData.vX *= -1;
      playerData.bonusVx *= -1;
      playerData.reactiveVx *= -1;
    }

    if (this.boundCollisionChecker.isYBoundCollision(playerData)) {
      playerData.vY *= -1;
      playerData.bonusVy *= -1;
      playerData.reactiveVy *= -1;
    }

    for (const rotationData of playerData.rotationData.values()) {
      rotationData.direction *= -1;
    }

    for (const gravityAssistData of playerData.gravityAssistData.values()) {
      gravityAssistData.direction *= -1;
    }
  }
}

export default CheckBoundCollisionMovementHandler;
