import PlayerData from '../../../../PlayerData';
import InteractionZoneMovementHandlerInterface from '../InteractionZoneMovementHandlerInterface';
import calculateDirection from '../../../calculateDirection';
import GravityAssistData from './GravityAssistData';
import config from '../../../../../config';
import rotatePlayerData from '../rotatePlayerData';
import calculateDistance from '../../../calculateDistance';

class SecondInteractionZoneHandler implements InteractionZoneMovementHandlerInterface {
  public updatePlayerData(playerData: PlayerData): void {
    for (const rotationData of playerData.gravityAssistData.values()) {
      const angle = config.gravityAssistRotationSpeed * config.dt;
      const oldX = playerData.x;
      const oldY = playerData.y;
      const { x, y } = rotatePlayerData(playerData, rotationData, angle);

      if (Math.abs(rotationData.angle) >= Math.PI && !playerData.bonusVx && !playerData.bonusVy) {
        playerData.bonusVx = (x - oldX) / config.dt / 2;
        playerData.bonusVy = (y - oldY) / config.dt / 2;
        continue;
      }

      playerData.x = x;
      playerData.y = y;
      rotationData.angle += angle;
    }
  }

  public updateMovementHandlerData(playerData: PlayerData, otherPlayerData: PlayerData): void {
    if (playerData.gravityAssistData.has(otherPlayerData.id)) {
      return;
    }

    const r = calculateDistance(playerData, otherPlayerData);
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
