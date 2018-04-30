const fourthZoneHandler = (playerData, otherPlayerData) => {
  playerData.attractionData.delete(otherPlayerData.id);
  playerData.rotationData.delete(otherPlayerData.id);
  playerData.gravityAssistData.delete(otherPlayerData.id);
  playerData.boundedToPlayersData.delete(otherPlayerData.id);
};

module.exports = fourthZoneHandler;
