import MovementHandlerInterface from './MovementHandlerInterface';
import PlayerData from '../../PlayerData';
import config from '../../../config';

class InfluencedByPlayersMovementHandler implements MovementHandlerInterface {
  public updatePlayerData(playerData: PlayerData): void {
    for (const boundToPlayerData of playerData.boundedToPlayersData.values()) {
      playerData.x += boundToPlayerData.vX * config.dt;
      playerData.y += boundToPlayerData.vY * config.dt;
    }
  }

  public getName(): string {
    return 'influenced_by_players_movement_handler';
  }
}

export default InfluencedByPlayersMovementHandler;
