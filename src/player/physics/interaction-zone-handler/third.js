const { RotationData } = require('../../PlayerData');

const thirdZoneHandler = (playerData, otherPlayerData) => {
  const r = Math.sqrt(
    (otherPlayerData.x - playerData.x) ** 2
    + (otherPlayerData.y - playerData.y) ** 2,
  );

  playerData.rotationData.set(otherPlayerData.id, new RotationData(
    otherPlayerData.x,
    otherPlayerData.y,
    r,
  ));
  playerData.boundedToPlayersData.set(otherPlayerData.id, otherPlayerData);
};

module.exports = thirdZoneHandler;
