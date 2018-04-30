const { GravityAssistData } = require('../../PlayerData');
const calculateDirection = require('../calculateDirection');

const secondZoneHandler = (playerData, otherPlayerData) => {
  if (playerData.gravityAssistData.has(otherPlayerData.id)) {
    return;
  }

  const r = Math.sqrt(
    (otherPlayerData.x - playerData.x) ** 2
    + (otherPlayerData.y - playerData.y) ** 2,
  );
  const direction = calculateDirection(playerData, otherPlayerData);
  const gravityAssistData = new GravityAssistData(
    otherPlayerData.x,
    otherPlayerData.y,
    r,
    direction,
    playerData.x,
    playerData.y,
  );
  playerData.gravityAssistData.set(otherPlayerData.id, gravityAssistData);

  playerData.boundedToPlayersData.set(otherPlayerData.id, otherPlayerData);
  playerData.rotationData.delete(otherPlayerData.id);
  playerData.attractionData.delete(otherPlayerData.id);
};

module.exports = secondZoneHandler;
