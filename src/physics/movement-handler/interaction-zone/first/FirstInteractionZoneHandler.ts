import AttractionData from './AttractionData';
import PlayerData from '../../../../storage/PlayerData';
import InteractionZoneMovementHandlerInterface from '../InteractionZoneMovementHandlerInterface';
import performGravityAttraction from '../../../utils/performGravityAttraction';

class FirstInteractionZoneHandler implements InteractionZoneMovementHandlerInterface {
  public updatePlayerData(playerData: PlayerData): void {
    for (const attractionData of playerData.attractionData.values()) {
      performGravityAttraction(playerData, attractionData);
    }
  }

  public updateMovementHandlerData(playerData: PlayerData, otherPlayerData: PlayerData): void {
    const attractionData = new AttractionData(otherPlayerData.x, otherPlayerData.y);

    playerData.attractionData.set(otherPlayerData.id, attractionData);
    playerData.boundedToPlayersData.set(otherPlayerData.id, otherPlayerData);
    playerData.rotationData.delete(otherPlayerData.id);
    playerData.gravityAssistData.delete(otherPlayerData.id);
  }

  public getInteractionZoneNumber(): number {
    return 1;
  }
}

export default FirstInteractionZoneHandler;
