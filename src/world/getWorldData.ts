import config from '../config';
import getPlayersData from '../player/getPlayersData';
import WorldData from './WorldData';

const playersData = getPlayersData();
const worldData = new WorldData(playersData, config.worldBounds);

export default worldData;
