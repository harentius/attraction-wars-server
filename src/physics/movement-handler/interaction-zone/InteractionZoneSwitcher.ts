import config from '../../../config';
import MovementHandlerRegistry from '../MovementHandlerRegistry';
import Storage from '../../../storage/Storage';
import isCirclesIntersect from '../../utils/isCirclesIntersect';
import OtherPlayerIdAwareInterface from './OtherPlayerIdAwareInterface';
import Player from '../../../player/Player';

class InteractionZoneSwitcher {
  private storage: Storage;
  private movementHandlerRegistry: MovementHandlerRegistry;

  constructor(storage: Storage, movementHandlerRegistry: MovementHandlerRegistry) {
    this.storage = storage;
    this.movementHandlerRegistry = movementHandlerRegistry;
  }

  public checkZoneSwitch(player: Player) {
    const { playersData } = this.storage.worldData;
    const playerData = player.playerData;

    // Clear in case other player was killed or disconnected
    for (const key of ['attractionData', 'rotationData', 'gravityAssistData', 'boundedToPlayersData']) {
      // @ts-ignore
      for (const otherPlayerIdAware: OtherPlayerIdAwareInterface of playerData[key].values()) {
        const otherPlayerId = otherPlayerIdAware.otherPlayerId;

        if (!playersData[otherPlayerId]) {
          playerData[key].delete(otherPlayerId);
        }
      }
    }

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

      if (
        (interactionZonePlayerIntoOtherPlayer === interactionZoneOtherPlayerIntoPlayer)
          &&
        (playerData.r > otherPlayerData.r)
      ) {
        return;
      }

      if (interactionZonePlayerIntoOtherPlayer <= interactionZoneOtherPlayerIntoPlayer) {
        const interactionZoneMovementHandler = this.movementHandlerRegistry
          .getInteractionZoneMovementHandler(interactionZonePlayerIntoOtherPlayer)
        ;

        // TODO
        if (interactionZoneMovementHandler) {
          interactionZoneMovementHandler.updateMovementHandlerData(player, otherPlayerData);
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

      if (isCirclesIntersect(playerData, circle)) {
        return i;
      }
    }

    return 4;
  }
}

export default InteractionZoneSwitcher;
