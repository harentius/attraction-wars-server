import PlayerData from '../../../../PlayerData';
import InteractionZoneMovementHandlerInterface from '../InteractionZoneMovementHandlerInterface';
import calculateDirection from '../../../calculateDirection';
import RotationData from './RotationData';
import rotatePlayerData from '../rotatePlayerData';
import config from '../../../../../config';
import calculateDistance from '../../../calculateDistance';
import GravityAssistData from '../second/GravityAssistData';

class ThirdInteractionZoneHandler implements InteractionZoneMovementHandlerInterface {
  public updatePlayerData(playerData: PlayerData): void {
    for (const rotationData of playerData.rotationData.values()) {
      const angle = config.rotationSpeed * config.dt;
      Object.assign(playerData, rotatePlayerData(playerData, rotationData, angle));
    }
  }

  public updateMovementHandlerData(playerData: PlayerData, otherPlayerData: PlayerData): void {
    const r = calculateDistance(playerData, otherPlayerData);
    let oldDirection = null;

    if (playerData.rotationData.has(otherPlayerData.id)) {
      oldDirection = playerData.rotationData.get(otherPlayerData.id).direction;
    }

    const direction = oldDirection || this.calculateDirection(playerData, otherPlayerData);
    const rotationData = new RotationData(otherPlayerData.x, otherPlayerData.y, r, direction);

    playerData.rotationData.set(otherPlayerData.id, rotationData);
    playerData.boundedToPlayersData.set(otherPlayerData.id, otherPlayerData);
    playerData.attractionData.delete(otherPlayerData.id);
    playerData.gravityAssistData.delete(otherPlayerData.id);
  }

  public getInteractionZoneNumber(): number {
    return 3;
  }

  public getName(): string {
    return 'third_interaction_zone_handler';
  }

  private calculateDirection(playerData: PlayerData, otherPlayerData: PlayerData): number {
    if (playerData.gravityAssistData.has(otherPlayerData.id)) {
      const gravityAssistData: GravityAssistData = playerData.gravityAssistData.get(otherPlayerData.id);

      return gravityAssistData.direction;
    }

    return calculateDirection(playerData, otherPlayerData);
  }
}

export default ThirdInteractionZoneHandler;
