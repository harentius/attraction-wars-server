import MovementHandlerInterface from './MovementHandlerInterface';
import PlayerData from '../../PlayerData';
import config from '../../../config';
import BoundCollisionChecker from './BoundCollisionChecker';

class InfluencedByPlayersMovementHandler implements MovementHandlerInterface {
  private boundCollisionChecker: BoundCollisionChecker;

  public constructor() {
    this.boundCollisionChecker = new BoundCollisionChecker();
  }

  public updatePlayerData(playerData: PlayerData): void {
    if (this.boundCollisionChecker.isBoundCollision(playerData)) {
      return;
    }

    for (const boundToPlayerData of playerData.boundedToPlayersData.values()) {
      playerData.x += (boundToPlayerData.vX + boundToPlayerData.bonusVx) * config.dt;
      playerData.y += (boundToPlayerData.vY + boundToPlayerData.bonusVy) * config.dt;
    }
  }

  public getName(): string {
    return 'influenced_by_players_movement_handler';
  }
}

export default InfluencedByPlayersMovementHandler;
