import MovementHandlerInterface from './MovementHandlerInterface';
import Storage from '../../storage/Storage';
import PlayerData from '../../storage/PlayerData';
import CircleInterface from '../CircleInterface';
import isCirclesIntersect from '../utils/isCirclesIntersect';
import Player from '../../player/Player';

class DeathMovementHandler implements MovementHandlerInterface {
  private storage: Storage;

  public constructor(storage: Storage) {
    this.storage = storage;
  }

  public handle(player: Player): void {
    const playerData = player.playerData;

    const { playersData } = this.storage.worldData;

    for (const otherPlayerData of Object.values(playersData)) {
      if (otherPlayerData.id === playerData.id) {
        continue;
      }

      if (this.isKilled(playerData, otherPlayerData)) {

      }
    }
  }

  private isKilled(playerData: PlayerData, otherObject: CircleInterface): boolean {
    if (playerData.r > otherObject.r) {
      return false;
    }

    return isCirclesIntersect(playerData, otherObject);
  }
}

export default DeathMovementHandler;
