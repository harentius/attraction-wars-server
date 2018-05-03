import PlayerData from '../../../../PlayerData';
import InteractionZoneMovementHandlerInterface from '../InteractionZoneMovementHandlerInterface';

class FourthInteractionZoneHandler implements InteractionZoneMovementHandlerInterface {
  // noinspection TsLint
  public updatePlayerData(playerData: PlayerData): void {
  }

  public updateMovementHandlerData(playerData: PlayerData, otherPlayerData: PlayerData): void {
    playerData.attractionData.delete(otherPlayerData.id);
    playerData.rotationData.delete(otherPlayerData.id);
    playerData.gravityAssistData.delete(otherPlayerData.id);
    playerData.boundedToPlayersData.delete(otherPlayerData.id);
  }

  public getInteractionZoneNumber(): number {
    return 4;
  }

  public getName(): string {
    return 'fourth_interaction_zone_handler';
  }
}

export default FourthInteractionZoneHandler;
