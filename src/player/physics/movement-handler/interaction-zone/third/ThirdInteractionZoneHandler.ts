import { PlayerData } from '../../../../PlayerData';
import InteractionZoneMovementHandlerInterface from '../InteractionZoneMovementHandlerInterface';
import calculateDirection from '../../../calculateDirection';
import RotationData from './RotationData';
import config from '../../../../../config';

class ThirdInteractionZoneHandler implements InteractionZoneMovementHandlerInterface {
  public updatePlayerData(playerData: PlayerData): void {
    for (const rotationData of playerData.rotationData.values()) {
      const t = config.rotationSpeed * config.dt * rotationData.direction + Math.atan2(
        playerData.y - rotationData.y,
        playerData.x - rotationData.x
      );
      playerData.x = rotationData.x
        + (rotationData.r * Math.cos(t))
      ;
      playerData.y = rotationData.y
        + (rotationData.r * Math.sin(t))
      ;
    }
  }

  public updateMovementHandlerData(playerData: PlayerData, otherPlayerData: PlayerData): void {
    const r = Math.sqrt(
      (otherPlayerData.x - playerData.x) ** 2
      + (otherPlayerData.y - playerData.y) ** 2
    );

    let oldDirection = null;

    if (playerData.rotationData.has(otherPlayerData.id)) {
      oldDirection = playerData.rotationData.get(otherPlayerData.id).direction;
    }

    const direction = oldDirection || calculateDirection(playerData, otherPlayerData);
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
}

export default ThirdInteractionZoneHandler;
