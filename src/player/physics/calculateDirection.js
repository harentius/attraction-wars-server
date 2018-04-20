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

  throw new Error('This code should be unreachable');
};

module.exports = calculateDirection;
