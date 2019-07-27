import MovementHandlerInterface from '../MovementHandlerInterface';
import BoundCollisionChecker from './BoundCollisionChecker';
import Player from '../../../player/Player';
import config from '../../../config';
import Storage from '../../../storage/Storage';
import PlayerData from '../../../storage/PlayerData';

const BORDER_MARGIN = 1;

class CheckBoundCollisionMovementHandler implements MovementHandlerInterface {
  private boundCollisionChecker: BoundCollisionChecker;
  private storage: Storage;

  public constructor(storage: Storage) {
    this.storage = storage;
    this.boundCollisionChecker = new BoundCollisionChecker();
  }

  public handle(player: Player): void {
    const playerData = player.playerData;

    if (!this.boundCollisionChecker.isBoundCollision(playerData)) {
      return;
    }

    if (this.boundCollisionChecker.isXBoundCollision(playerData)) {
      playerData.vX *= -1;
      playerData.bonusVx *= -1;
      playerData.reactiveVx *= -1;
      playerData.aX *= -1;
      this.updateKeyPressState(playerData);
    }

    if (this.boundCollisionChecker.isYBoundCollision(playerData)) {
      playerData.vY *= -1;
      playerData.bonusVy *= -1;
      playerData.reactiveVy *= -1;
      playerData.aY *= -1;
      this.updateKeyPressState(playerData);
    }

    for (const rotationData of playerData.rotationData.values()) {
      rotationData.direction *= -1;
    }

    for (const gravityAssistData of playerData.gravityAssistData.values()) {
      gravityAssistData.direction *= -1;
    }

    if (this.boundCollisionChecker.isXLeftBoundCollision(playerData)) {
      playerData.x = playerData.r + BORDER_MARGIN;
    }

    if (this.boundCollisionChecker.isXRightBoundCollision(playerData)) {
      playerData.x = config.worldBounds[2] - playerData.r - BORDER_MARGIN;
    }

    if (this.boundCollisionChecker.isYLeftBoundCollision(playerData)) {
      playerData.y = playerData.r + BORDER_MARGIN;
    }

    if (this.boundCollisionChecker.isYRightBoundCollision(playerData)) {
      playerData.y =  config.worldBounds[3] - playerData.r - BORDER_MARGIN;
    }
  }

  private updateKeyPressState(playerData: PlayerData): void {
    const client = this.storage.getClient(playerData.id);
    this.storage.updateKeyPressState(playerData.id, client.keyPressState);
  }
}

export default CheckBoundCollisionMovementHandler;
