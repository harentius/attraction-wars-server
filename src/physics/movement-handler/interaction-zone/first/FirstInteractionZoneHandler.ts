import AttractionData from './AttractionData';
import config from '../../../../config';
import PlayerData from '../../../../storage/PlayerData';
import InteractionZoneMovementHandlerInterface from '../InteractionZoneMovementHandlerInterface';

class FirstInteractionZoneHandler implements InteractionZoneMovementHandlerInterface {
  public updatePlayerData(playerData: PlayerData): void {
    for (const attractionData of playerData.attractionData.values()) {
      const dx = attractionData.x - playerData.x;
      const dy = attractionData.y - playerData.y;
      /** This is not real world distance
       * But this is value which pretend to work in similar way as real world distance
       * This is "pseudo interaction potential"
       */
      const r = dx ** 2 + dy ** 2 + 1;
      const vX = config.attractionSpeed * dx / r;
      const vY = config.attractionSpeed * dy / r;

      if (Math.abs(dx) < playerData.r / 4 && Math.abs(dy) < playerData.r / 4) {
        return;
      }

      playerData.x += vX * config.dt;
      playerData.y += vY * config.dt;
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

  public getName(): string {
    return 'first_interaction_zone_handler';
  }
}

export default FirstInteractionZoneHandler;
