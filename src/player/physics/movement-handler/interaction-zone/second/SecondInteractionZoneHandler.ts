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

    // Still on the orbit
    if (playerData.gravityAssistData.size > 0) {
      return;
    }

    const considerStoppedWhen = config.considerStoppedWhen;
    let stoppedProjections = 0;

    if (Math.abs(playerData.bonusVx) < considerStoppedWhen) {
      playerData.bonusVx = config.minSpeed;
      stoppedProjections++;
    }

    if (Math.abs(playerData.bonusVy) < considerStoppedWhen) {
      playerData.bonusVy = config.minSpeed;
      stoppedProjections++;
    }

    // Already stopped
    if (stoppedProjections === 2) {
      return;
    }

    // Bonus speed attenuating
    const newBonusVx = (playerData.bonusVx > 0)
      ? Math.max(0, playerData.bonusVx - config.gravityAssistReleaseDv * config.dt)
      : Math.min(0, playerData.bonusVx + config.gravityAssistReleaseDv * config.dt)
    ;

    const k = Math.abs(playerData.bonusVy / playerData.bonusVx);
    const newBonusVy = (playerData.bonusVy > 0)
      ? Math.max(0, playerData.bonusVy - config.gravityAssistReleaseDv * k * config.dt)
      : Math.min(0, playerData.bonusVy + config.gravityAssistReleaseDv * k * config.dt)
    ;
    playerData.bonusVx = newBonusVx;
    playerData.bonusVy = newBonusVy;
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
      playerData.y,
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
