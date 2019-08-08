import WorldData from '../WorldData';
import { truncateFloat } from '../../utils';

class WorldDataFilter {
  public filter(worldData: WorldData): object {
    const data = {
      playersData: {},
      // asteroidsData: {},
      serverStatistics: {
        loadPercent: worldData.serverStatistics.loadPercent,
        maxLoadPercent: worldData.serverStatistics.maxLoadPercent,
        averageLoadPercent: worldData.serverStatistics.averageLoadPercent,
        onlineCount: worldData.serverStatistics.onlineCount,
      },
    };

    for (const [key, playerData] of Object.entries(worldData.playersData)) {
      data.playersData[key] = {
        x: truncateFloat(playerData.x),
        y: truncateFloat(playerData.y),
        r: truncateFloat(playerData.r),
        score: truncateFloat(playerData.score),
      };
    }

    // TODO; Currently asteroids static (except attraction moments), so so reason to sync. Will be changed in future.
    // for (const [key, asteroidData] of Object.entries(worldData.asteroidsData)) {
    //   data.asteroidsData[key] = {
    //     x: truncateFloat(asteroidData.x),
    //     y: truncateFloat(asteroidData.y),
    //   };
    // }

    return data;
  }
}

export default WorldDataFilter;
