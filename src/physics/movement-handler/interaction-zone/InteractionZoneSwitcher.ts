import config from '../../../config';
import MovementHandlerRegistry from '../MovementHandlerRegistry';
import Storage from '../../../storage/Storage';

class InteractionZoneSwitcher {
  private storage: Storage;
  private movementHandlerRegistry: MovementHandlerRegistry;

  constructor(storage: Storage, movementHandlerRegistry: MovementHandlerRegistry) {
    this.storage = storage;
    this.movementHandlerRegistry = movementHandlerRegistry;
  }

  public checkZoneSwitch(playerData) {
    const { playersData } = this.storage.worldData;

    for (const otherPlayerData of (Object as any).values(playersData)) {
      if (otherPlayerData.id === playerData.id) {
        continue;
      }

      const interactionZonePlayerIntoOtherPlayer = this._getInteractionZone(
        playerData,
        otherPlayerData,
      );

      const interactionZoneOtherPlayerIntoPlayer = this._getInteractionZone(
        otherPlayerData,
        playerData,
      );

      if (interactionZonePlayerIntoOtherPlayer <= interactionZoneOtherPlayerIntoPlayer) {
        const interactionZoneMovementHandler = this.movementHandlerRegistry
          .getInteractionZoneMovementHandler(interactionZonePlayerIntoOtherPlayer)
        ;

        // TODO
        if (interactionZoneMovementHandler) {
          interactionZoneMovementHandler.updateMovementHandlerData(playerData, otherPlayerData);
        }
      }
    }
  }

  // First zone is closest to player circle
  private _getInteractionZone(playerData, otherPlayerData) {
    // Check is first zone.
    let i = 0;

    for (const RofZone of config.relativeZonesSizes) {
      i++;
      const { x, y, r } = otherPlayerData;
      const circle = { x, y, r: RofZone * r };

      if (this._circlesIntersect(playerData, circle)) {
        return i;
      }
    }

    return 4;
  }

  private _circlesIntersect(circle1, circle2) {
    return Math.pow((circle1.x - circle2.x), 2) + Math.pow((circle1.y - circle2.y), 2)
      < Math.pow(circle1.r + circle2.r, 2)
    ;
  }
}

export default InteractionZoneSwitcher;
