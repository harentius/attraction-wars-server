const genId = () => Math.random().toString(36).substr(2, 16);
const { generateRandomColor } = require('../utils');

class RotationData {
  constructor(x, y, r, direction = 1) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.direction = direction;
  }
}

class PlayerData {
  constructor(x, y, r, id = genId(), color = generateRandomColor()) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.vX = 0;
    this.vY = 0;
    this.aX = 0;
    this.aY = 0;
    this.rotationData = new Map();
    this.boundedToPlayersData = new Map();
    this.color = color;
  }
}

module.exports = { RotationData, PlayerData };
