import PlayerData from '../../../../storage/PlayerData';
import InteractionZoneMovementHandlerInterface from '../InteractionZoneMovementHandlerInterface';
import Player from '../../../../player/Player';

class FourthInteractionZoneHandler implements InteractionZoneMovementHandlerInterface {
  // noinspection TsLint
  public handle(player: Player): void {
  }

  public updateMovementHandlerData(player: Player, otherPlayerData: PlayerData): void {
    const playerData = player.playerData;
    playerData.attractionData.delete(otherPlayerData.id);
    playerData.rotationData.delete(otherPlayerData.id);
    playerData.gravityAssistData.delete(otherPlayerData.id);
    playerData.boundedToPlayersData.delete(otherPlayerData.id);
    playerData.isCanPerformGravityAssist = true;
  }

  public getInteractionZoneNumber(): number {
    return 4;
  }
}

export default FourthInteractionZoneHandler;
