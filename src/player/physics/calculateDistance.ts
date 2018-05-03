import PlayerData from '../PlayerData';

const calculateDistance = (playerData1: PlayerData, playerData2: PlayerData) => {
  return Math.sqrt(
    (playerData1.x - playerData2.x) ** 2
    + (playerData1.y - playerData2.y) ** 2
  );
};

export default calculateDistance;
