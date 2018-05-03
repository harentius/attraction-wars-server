import PlayerData from './PlayerData';
import { generateRandomColor } from '../utils';

const getPlayersData = () => ({
  demo_player1: new PlayerData(1650, 1650, 200, 'demo_player1', generateRandomColor())
});

export default getPlayersData;
