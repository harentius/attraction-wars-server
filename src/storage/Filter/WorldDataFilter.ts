import WorldData from '../WorldData';
// import CircleInterface from '../../physics/CircleInterface';
// import PlayerData from '../PlayerData';
import { truncateFloat } from '../../utils';
// import AsteroidData from '../AsteroidData';

class WorldDataFilter {
  public filter(worldData: WorldData): object {
    const data = {
      playersData: {},
      // asteroidsData: {},
      serverStatistics: worldData.serverStatistics,
    };

    for (const [key, playerData] of Object.entries(worldData.playersData)) {
      data.playersData[key] = {
        x: truncateFloat(playerData.x),
        y: truncateFloat(playerData.y),
        r: truncateFloat(playerData.r),
        score: truncateFloat(playerData.score),
      };
    }

    // TODO
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
