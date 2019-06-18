import PlayerData from '../../../PlayerData';
import RotationData from './third/RotationData';

const rotatePlayerData = (playerData: PlayerData, rotationData: RotationData, angle: number) => {
  const t = angle * rotationData.direction + Math.atan2(
    playerData.y - rotationData.y,
    playerData.x - rotationData.x,
  );
  const x = rotationData.x
    + (rotationData.r * Math.cos(t))
  ;
  const y = rotationData.y
    + (rotationData.r * Math.sin(t))
  ;

  return { x, y };
};

export default rotatePlayerData;
