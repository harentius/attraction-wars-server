import { AttractionData } from '../../PlayerData';

const firstZoneHandler = (playerData, otherPlayerData) => {
  const attractionData = new AttractionData(otherPlayerData.x, otherPlayerData.y);

  playerData.attractionData.set(otherPlayerData.id, attractionData);
  playerData.boundedToPlayersData.set(otherPlayerData.id, otherPlayerData);
  playerData.rotationData.delete(otherPlayerData.id);
  playerData.gravityAssistData.delete(otherPlayerData.id);
};

export default firstZoneHandler;
