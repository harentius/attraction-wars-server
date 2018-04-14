const firstZoneHandler = (playerData, otherPlayerData) =>
  playerData.removeRotationData(otherPlayerData.id);

module.exports = firstZoneHandler;
