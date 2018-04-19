const config = require('../config');
const { getValueNotViolatingBounds } = require('../utils');

class Player {
  constructor(playerData, physics) {
    this.playerData = playerData;
    this._physics = physics;
    this._isAttenuation = false;
  }

  setAcceleration({ aX, aY }, isAttenuation = false) {
    this.playerData.aX = aX;
    this.playerData.aY = aY;
    this._isAttenuation = isAttenuation;
  }

  isStoppedX() {
    return this.playerData.vX === config.minSpeed;
  }

  isStoppedY() {
    return this.playerData.vY === config.minSpeed;
  }

  updateData() {
    this._updateVelocity();

    if (this.playerData.rotationData.size > 0) {
      this._rotateAroundDistance();
      this._moveInfluencedByPlayers();
    }

    this.playerData.x += this.playerData.vX * config.dt;
    this.playerData.y += this.playerData.vY * config.dt;
    this._checkBoundCollisions();
    this._physics.checkZoneSwitch(this.playerData);
  }

  _updateVelocity() {
    if (this._isXBoundCollision() || this._isYBoundCollision()) {
      return;
    }

    const considerStoppedWhen = Math.min(config.releaseDv, config.keyPressDv) / 2;
    let newVx;
    let newVy;

    if (this._isAttenuation) {
      newVx = (this.playerData.vX > 0)
        ? Math.max(0, this.playerData.vX + this.playerData.aX * config.dt)
        : Math.min(0, this.playerData.vX + this.playerData.aX * config.dt)
      ;

      newVy = (this.playerData.vY > 0)
        ? Math.max(0, this.playerData.vY + this.playerData.aY * config.dt)
        : Math.min(0, this.playerData.vY + this.playerData.aY * config.dt)
      ;
    } else {
      newVx = this.playerData.vX + this.playerData.aX * config.dt;
      newVy = this.playerData.vY + this.playerData.aY * config.dt;
    }

    this.playerData.vX = getValueNotViolatingBounds(newVx, -config.maxSpeed, config.maxSpeed);
    this.playerData.vY = getValueNotViolatingBounds(newVy, -config.maxSpeed, config.maxSpeed);

    if (this._isAttenuation) {
      if (Math.abs(this.playerData.vX) < considerStoppedWhen) {
        this.playerData.vX = config.minSpeed;
        this.playerData.aX = 0;
      }

      if (Math.abs(this.playerData.vY) < considerStoppedWhen) {
        this.playerData.vY = config.minSpeed;
        this.playerData.aY = 0;
      }
    }
  }

  _checkBoundCollisions() {
    if (this._isXBoundCollision()) {
      this.playerData.vX *= -1;
    }

    if (this._isYBoundCollision()) {
      this.playerData.vY *= -1;
    }
  }

  _isXBoundCollision() {
    return (this.playerData.x < (config.worldBounds[0] + this.playerData.r))
        ||
      (this.playerData.x > (config.worldBounds[2] - this.playerData.r))
    ;
  }

  _isYBoundCollision() {
    return (this.playerData.y < (config.worldBounds[1] + this.playerData.r))
        ||
      (this.playerData.y > (config.worldBounds[3] - this.playerData.r))
    ;
  }

  _rotateAroundDistance() {
    for (const rotationData of this.playerData.rotationData.values()) {
      const t = config.rotationSpeed + Math.atan2(
        this.playerData.y - rotationData.y,
        this.playerData.x - rotationData.x,
      );
      this.playerData.x = rotationData.x
        + (rotationData.r * Math.cos(t))
      ;
      this.playerData.y = rotationData.y
        + (rotationData.r * Math.sin(t))
      ;
    }
  }

  _moveInfluencedByPlayers() {
    for (const playerData of this.playerData.boundedToPlayersData.values()) {
      this.playerData.x += playerData.vX * config.dt;
      this.playerData.y += playerData.vY * config.dt;
    }
  }
}

module.exports = Player;
