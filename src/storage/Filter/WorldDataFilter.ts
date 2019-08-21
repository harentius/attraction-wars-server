import WorldData from '../WorldData';
import { truncateFloat } from '../../utils';

class WorldDataFilter {
  public filter(worldData: WorldData): object {
    const data = {
      playersData: {},
      // asteroidsData: {},
    };

    for (const [key, playerData] of Object.entries(worldData.playersData)) {
      data.playersData[key] = {
        x: truncateFloat(playerData.x),
        y: truncateFloat(playerData.y),
        r: truncateFloat(playerData.r),
        score: truncateFloat(playerData.score),
      };
    }

    return data;
  }
}

export default WorldDataFilter;
