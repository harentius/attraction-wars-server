const secondZoneHandler = (playerData, otherPlayerData) =>
  playerData.rotationData.delete(otherPlayerData.id);

module.exports = secondZoneHandler;
