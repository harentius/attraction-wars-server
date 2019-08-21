import WorldData from '../WorldData';
import { truncateFloat } from '../../utils';

class FullWorldDataFilter {
  public filter(worldData: WorldData): object {
    const data = {
      relativeZonesSizes: worldData.relativeZonesSizes,
      worldBounds: worldData.worldBounds,
      playersData: {},
      asteroidsData: {},
      asteroidAttractionRadiusMultiplier: worldData.asteroidAttractionRadiusMultiplier,
    };

    for (const [key, playerData] of Object.entries(worldData.playersData)) {
      data.playersData[key] = {
        x: truncateFloat(playerData.x),
        y: truncateFloat(playerData.y),
        r: truncateFloat(playerData.r),
        username: playerData.username,
        color: playerData.color,
        score: truncateFloat(playerData.score),
      };
    }

    for (const [key, asteroidData] of Object.entries(worldData.asteroidsData)) {
      data.asteroidsData[key] = {
        x: truncateFloat(asteroidData.x),
        y: truncateFloat(asteroidData.y),
        r: truncateFloat(asteroidData.r),
        color: asteroidData.color,
      };
    }

    return data;
  }
}

export default FullWorldDataFilter;
