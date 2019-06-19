import PlayerData from './PlayerData';

class WorldData {
  public readonly playersData: any;
  public readonly worldBounds: any;
  public readonly relativeZonesSizes: number[];

  constructor(
    relativeZonesSizes: number[],
    worldBounds = [],
  ) {
    this.relativeZonesSizes = relativeZonesSizes;
    this.worldBounds = worldBounds;
    this.playersData = {};
  }

  public addPlayerData(playerData: PlayerData) {
    this.playersData[playerData.id] = playerData;
  }

  public removePlayerData(id: string) {
    for (const playerData of (Object as any).values(this.playersData)) {
      playerData.rotationData.delete(id);
      playerData.attractionData.delete(id);
      playerData.boundedToPlayersData.delete(id);
    }

    delete this.playersData[id];
  }
}

export default WorldData;
