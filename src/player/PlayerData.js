const genId = () => Math.random().toString(36).substr(2, 16);
const { generateRandomColor } = require('../utils');

class RotationData {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
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
    this.color = color;
  }

  setRotationData(id, rotationData) {
    this.rotationData.set(id, rotationData);
  }

  removeRotationData(id) {
    this.rotationData.delete(id);
  }
}

module.exports = { RotationData, PlayerData };
