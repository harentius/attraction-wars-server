class WorldData {
  constructor(playersData = {}, worldBounds = []) {
    this.playersData = playersData;
    this.worldBounds = worldBounds;
  }

  addPlayerData(playerData) {
    this.playersData[playerData.id] = playerData;
  }

  removePlayerData(id) {
    delete this.playersData[id];
  }
}

module.exports = WorldData;
