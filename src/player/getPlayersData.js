const { PlayerData } = require('./PlayerData');

const getPlayersData = () => ({
  demo_player1: new PlayerData(650, 650, 200, 'demo_player1', +(Math.random() * 16777215)),
});

module.exports = getPlayersData;
