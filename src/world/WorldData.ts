import { PlayerData } from '../player/PlayerData';

class WorldData {
  public playersData: any;
  public worldBounds: any;

  constructor(playersData = {}, worldBounds = []) {
    this.playersData = playersData;
    this.worldBounds = worldBounds;
  }

  public addPlayerData(playerData) {
    this.playersData[playerData.id] = playerData;
  }

  public removePlayerData(id) {
    for (const playerData of (Object as any).values(this.playersData)) {
      playerData.rotationData.delete(id);
      playerData.attractionData.delete(id);
      playerData.boundedToPlayersData.delete(id);
    }

    delete this.playersData[id];
  }
}

export default WorldData;
