const { PlayerData } = require('./PlayerData');
const { generateRandomColor } = require('../utils');

const getPlayersData = () => ({
  demo_player1: new PlayerData(1650, 1650, 200, 'demo_player1', generateRandomColor()),
});

module.exports = getPlayersData;
