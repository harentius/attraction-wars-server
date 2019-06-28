import MovementHandlerInterface from '../MovementHandlerInterface';
import config from '../../../config';
import BoundCollisionChecker from '../boundary/BoundCollisionChecker';
import Player from '../../../player/Player';

class InfluencedPlayersMovementHandler implements MovementHandlerInterface {
  private boundCollisionChecker: BoundCollisionChecker;

  public constructor() {
    this.boundCollisionChecker = new BoundCollisionChecker();
  }

  public handle(player: Player): void {
    const playerData = player.playerData;

    if (this.boundCollisionChecker.isBoundCollision(playerData)) {
      return;
    }

    for (const boundToPlayerData of playerData.boundedToPlayersData.values()) {
      playerData.x += (boundToPlayerData.vX + boundToPlayerData.bonusVx) * config.dt * (1.0 - config.bindViscosity);
      playerData.y += (boundToPlayerData.vY + boundToPlayerData.bonusVy) * config.dt * (1.0 - config.bindViscosity);
    }
  }
}

export default InfluencedPlayersMovementHandler;
