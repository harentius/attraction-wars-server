const secondZoneHandler = (playerData, otherPlayerData) =>
  playerData.removeRotationData(otherPlayerData.id);

module.exports = secondZoneHandler;
