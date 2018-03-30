const genId = () => Math.random().toString(36).substr(2, 16);

class RotationData {
  constructor(x, y, R) {
    this.x = x;
    this.y = y;
    this.R = R;
  }
}

class PlayerData {
  constructor(x, y, r, id = genId(), color = 0x303331) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.vX = 0;
    this.vY = 0;
    this.aX = 0;
    this.aY = 0;
    this.rotationData = null;
    this.color = color;
  }
}

module.exports = { RotationData, PlayerData };
