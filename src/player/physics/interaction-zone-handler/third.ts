import { RotationData } from '../../PlayerData';
import calculateDirection from '../calculateDirection';

const thirdZoneHandler = (playerData, otherPlayerData) => {
  const r = Math.sqrt(
    (otherPlayerData.x - playerData.x) ** 2
    + (otherPlayerData.y - playerData.y) ** 2
  );

  let oldDirection = null;

  if (playerData.rotationData.has(otherPlayerData.id)) {
    oldDirection = playerData.rotationData.get(otherPlayerData.id).direction;
  }

  const direction = oldDirection || calculateDirection(playerData, otherPlayerData);
  const rotationData = new RotationData(otherPlayerData.x, otherPlayerData.y, r, direction);

  playerData.rotationData.set(otherPlayerData.id, rotationData);
  playerData.boundedToPlayersData.set(otherPlayerData.id, otherPlayerData);
  playerData.attractionData.delete(otherPlayerData.id);
  playerData.gravityAssistData.delete(otherPlayerData.id);
};

export default thirdZoneHandler;
