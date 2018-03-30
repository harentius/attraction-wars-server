const WorldData = require('./WorldData');
const playersData = require('../player/getPlayersData')();
const config = require('../config');

const worldData = new WorldData(playersData, config.worldBounds);

module.exports = worldData;
