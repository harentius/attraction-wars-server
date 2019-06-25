import PointInterface from '../PointInterface';

const calculateDistance = (playerData1: PointInterface, playerData2: PointInterface) => {
  return Math.sqrt(
    (playerData1.x - playerData2.x) ** 2
    + (playerData1.y - playerData2.y) ** 2,
  );
};

export default calculateDistance;
