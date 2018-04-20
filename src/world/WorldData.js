class WorldData {
  constructor(playersData = {}, worldBounds = []) {
    this.playersData = playersData;
    this.worldBounds = worldBounds;
  }

  addPlayerData(playerData) {
    this.playersData[playerData.id] = playerData;
  }

  removePlayerData(id) {
    for (const playerData of Object.values(this.playersData)) {
      playerData.rotationData.delete(id);
      playerData.attractionData.delete(id);
      playerData.boundedToPlayersData.delete(id);
    }

    delete this.playersData[id];
  }
}

module.exports = WorldData;
