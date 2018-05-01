const calculateDirection = (playerData, otherPlayerData) => {
  if (playerData.vX > 0 && playerData.vY >= 0) {
    return playerData.x > otherPlayerData.x ? 1 : -1;
  }

  if (playerData.vX <= 0 && playerData.vY > 0) {
    return playerData.x > otherPlayerData.x ? 1 : -1;
  }

  if (playerData.vX >= 0 && playerData.vY < 0) {
    return playerData.x > otherPlayerData.x ? -1 : 1;
  }

  if (playerData.vX < 0 && playerData.vY <= 0) {
    return playerData.x > otherPlayerData.x ? -1 : 1;
  }

  return 1;
};

export default calculateDirection;
