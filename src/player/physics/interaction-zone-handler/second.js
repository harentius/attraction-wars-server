const secondZoneHandler = (playerData, otherPlayerData) => {
  playerData.boundedToPlayersData.set(otherPlayerData.id, otherPlayerData);
  playerData.rotationData.delete(otherPlayerData.id);
  playerData.attractionData.delete(otherPlayerData.id);
};

module.exports = secondZoneHandler;
