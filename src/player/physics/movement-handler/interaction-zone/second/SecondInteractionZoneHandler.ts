import { PlayerData } from '../../../../PlayerData';
import InteractionZoneMovementHandlerInterface from '../InteractionZoneMovementHandlerInterface';
import calculateDirection from '../../../calculateDirection';
import GravityAssistData from './GravityAssistData';
import config from '../../../../../config';

class SecondInteractionZoneHandler implements InteractionZoneMovementHandlerInterface {
  public updatePlayerData(playerData: PlayerData): void {
    for (const rotationData of playerData.gravityAssistData.values()) {
      const angle = config.gravityAssistRotationSpeed * config.dt;
      const t = angle * rotationData.direction + Math.atan2(
        playerData.y - rotationData.y,
        playerData.x - rotationData.x
      );
      const oldX = playerData.x;
      const newX = rotationData.x
        + (rotationData.r * Math.cos(t))
      ;
      const oldY = playerData.y;
      const newY = rotationData.y
        + (rotationData.r * Math.sin(t))
      ;

      if (Math.abs(rotationData.angle) >= Math.PI && !playerData.bonusVx && !playerData.bonusVy) {
        playerData.bonusVx = (newX - oldX) / config.dt / 2;
        playerData.bonusVy = (newY - oldY) / config.dt / 2;
        continue;
      }

      playerData.x = newX;
      playerData.y = newY;
      rotationData.angle += angle;
    }
  }

  public updateMovementHandlerData(playerData: PlayerData, otherPlayerData: PlayerData): void {
    if (playerData.gravityAssistData.has(otherPlayerData.id)) {
      return;
    }

    const r = Math.sqrt(
      (otherPlayerData.x - playerData.x) ** 2
      + (otherPlayerData.y - playerData.y) ** 2
    );
    const direction = calculateDirection(playerData, otherPlayerData);
    const gravityAssistData = new GravityAssistData(
      otherPlayerData.x,
      otherPlayerData.y,
      r,
      direction,
      playerData.x,
      playerData.y
    );
    playerData.gravityAssistData.set(otherPlayerData.id, gravityAssistData);

    playerData.boundedToPlayersData.set(otherPlayerData.id, otherPlayerData);
    playerData.rotationData.delete(otherPlayerData.id);
    playerData.attractionData.delete(otherPlayerData.id);
  }

  public getInteractionZoneNumber(): number {
    return 2;
  }

  public getName(): string {
    return 'second_interaction_zone_handler';
  }
}

export default SecondInteractionZoneHandler;
