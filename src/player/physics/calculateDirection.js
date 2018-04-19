const calculateDirection = (playerData, otherPlayerData) => {
  if (playerData.vX > 0 && playerData.vY >= 0) {
    if (playerData.x > otherPlayerData.x && playerData.y > otherPlayerData.y) {
      return 1;
    }

    if (playerData.x < otherPlayerData.x && playerData.y > otherPlayerData.y) {
      return -1;
    }

    if (playerData.x > otherPlayerData.x && playerData.y < otherPlayerData.y) {
      return 1;
    }

    if (playerData.x < otherPlayerData.x && playerData.y < otherPlayerData.y) {
      return -1;
    }
  }

  if (playerData.vX <= 0 && playerData.vY > 0) {
    if (playerData.x > otherPlayerData.x && playerData.y > otherPlayerData.y) {
      return 1;
    }

    if (playerData.x < otherPlayerData.x && playerData.y > otherPlayerData.y) {
      return -1;
    }

    if (playerData.x > otherPlayerData.x && playerData.y < otherPlayerData.y) {
      return 1;
    }

    if (playerData.x < otherPlayerData.x && playerData.y < otherPlayerData.y) {
      return -1;
    }
  }

  if (playerData.vX >= 0 && playerData.vY < 0) {
    if (playerData.x > otherPlayerData.x && playerData.y > otherPlayerData.y) {
      return -1;
    }

    if (playerData.x < otherPlayerData.x && playerData.y > otherPlayerData.y) {
      return 1;
    }

    if (playerData.x > otherPlayerData.x && playerData.y < otherPlayerData.y) {
      return -1;
    }

    if (playerData.x < otherPlayerData.x && playerData.y < otherPlayerData.y) {
      return 1;
    }
  }

  if (playerData.vX < 0 && playerData.vY <= 0) {
    if (playerData.x > otherPlayerData.x && playerData.y > otherPlayerData.y) {
      return -1;
    }

    if (playerData.x < otherPlayerData.x && playerData.y > otherPlayerData.y) {
      return 1;
    }

    if (playerData.x > otherPlayerData.x && playerData.y < otherPlayerData.y) {
      return -1;
    }

    if (playerData.x < otherPlayerData.x && playerData.y < otherPlayerData.y) {
      return 1;
    }
  }

  throw new Error('This code should be unreachable');
};

module.exports = calculateDirection;
