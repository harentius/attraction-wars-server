const { RotationData } = require('../../PlayerData');

const thirdZoneHandler = (playerData, otherPlayerData) => {
  const R = Math.sqrt(
    (otherPlayerData.x - playerData.x) ** 2
    + (otherPlayerData.y - playerData.y) ** 2,
  );

  playerData.setRotationData(new RotationData(
    otherPlayerData.x,
    otherPlayerData.y,
    R,
  ));
};

module.exports = thirdZoneHandler;
