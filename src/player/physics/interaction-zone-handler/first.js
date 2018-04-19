const firstZoneHandler = (playerData, otherPlayerData) =>
  playerData.rotationData.delete(otherPlayerData.id);

module.exports = firstZoneHandler;
