import PlayerData from './PlayerData';
import AsteroidData from './AsteroidData';

class WorldData {
  public readonly playersData: any;
  public readonly asteroidsData: { [key: string]: AsteroidData };
  public readonly worldBounds: number[];
  public readonly relativeZonesSizes: number[];

  constructor(
    relativeZonesSizes: number[],
    worldBounds = [],
  ) {
    this.relativeZonesSizes = relativeZonesSizes;
    this.worldBounds = worldBounds;
    this.playersData = {};
    this.asteroidsData = {};
  }

  public addPlayerData(playerData: PlayerData) {
    this.playersData[playerData.id] = playerData;
  }

  public addAsteroidData(asteroidData: AsteroidData) {
    this.asteroidsData[asteroidData.id] = asteroidData;
  }

  public removeAsteroidData(id: string) {
    delete this.asteroidsData[id];
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
