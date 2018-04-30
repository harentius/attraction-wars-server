const genId = () => Math.random().toString(36).substr(2, 16);
const { generateRandomColor } = require('../utils');

class AttractionData {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class RotationData {
  constructor(x, y, r, direction) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.direction = direction;
  }
}

class GravityAssistData extends RotationData {
  constructor(x, y, r, direction, xIn, yIn) {
    super(x, y, r, direction);
    this.xIn = xIn;
    this.yIn = yIn;
    this.angle = 0;
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
    this.bonusVx = 0;
    this.bonusVy = 0;
    this.aX = 0;
    this.aY = 0;
    this.attractionData = new Map();
    this.rotationData = new Map();
    this.gravityAssistData = new Map();
    this.boundedToPlayersData = new Map();
    this.color = color;
  }
}

module.exports = { RotationData, PlayerData, AttractionData, GravityAssistData };
