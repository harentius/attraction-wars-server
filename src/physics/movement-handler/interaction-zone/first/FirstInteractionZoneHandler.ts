import AttractionData from './AttractionData';
import PlayerData from '../../../../storage/PlayerData';
import InteractionZoneMovementHandlerInterface from '../InteractionZoneMovementHandlerInterface';
import performGravityAttraction from '../../../utils/performGravityAttraction';
import Player from '../../../../player/Player';

class FirstInteractionZoneHandler implements InteractionZoneMovementHandlerInterface {
  public handle(player: Player): void {
    const playerData = player.playerData;

    for (const attractionData of playerData.attractionData.values()) {
      performGravityAttraction(playerData, attractionData);
    }
  }

  public updateMovementHandlerData(player: Player, otherPlayerData: PlayerData): void {
    const attractionData = new AttractionData(otherPlayerData.id, otherPlayerData.x, otherPlayerData.y);
    const playerData = player.playerData;

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
