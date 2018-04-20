const fourthZoneHandler = (playerData, otherPlayerData) => {
  playerData.rotationData.delete(otherPlayerData.id);
  playerData.boundedToPlayersData.delete(otherPlayerData.id);
  playerData.attractionData.delete(otherPlayerData.id);
};

module.exports = fourthZoneHandler;
