import config from '../config';
import { getValueNotViolatingBounds } from '../utils';

class Player {
  public playerData: any;
  private physics: any;
  private isAttenuation: boolean;

  constructor(playerData, physics) {
    this.playerData = playerData;
    this.physics = physics;
    this.isAttenuation = false;
  }

  public setAcceleration({ aX, aY }, isAttenuation = false) {
    this.playerData.aX = aX;
    this.playerData.aY = aY;
    this.isAttenuation = isAttenuation;
  }

  public isStoppedX() {
    return this.playerData.vX === config.minSpeed;
  }

  public isStoppedY() {
    return this.playerData.vY === config.minSpeed;
  }

  public updateData() {
    this.physics.checkZoneSwitch(this.playerData);
    this._moveAttractedByPlayers();
    this._rotateAroundPlayers();
    this._moveByGravityAssist();
    this._moveInfluencedByPlayers();
    this._updateVelocity();

    this.playerData.x += (this.playerData.vX + this.playerData.bonusVx) * config.dt;
    this.playerData.y += (this.playerData.vY + this.playerData.bonusVy) * config.dt;
    this._checkBoundCollisions();
  }

  private _updateVelocity() {
    if (this._isXBoundCollision() || this._isYBoundCollision()) {
      return;
    }

    const considerStoppedWhen = Math.min(config.releaseDv, config.keyPressDv) / 2;
    let newVx: number;
    let newVy: number;

    if (this.isAttenuation) {
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

    this.playerData.vX = getValueNotViolatingBounds(
      newVx,
      -config.maxMovementSpeed,
      config.maxMovementSpeed
    );
    this.playerData.vY = getValueNotViolatingBounds(
      newVy,
      -config.maxMovementSpeed,
      config.maxMovementSpeed
    );

    if (this.isAttenuation) {
      if (Math.abs(this.playerData.vX) < considerStoppedWhen) {
        this.playerData.vX = config.minSpeed;
        this.playerData.aX = 0;
      }

      if (Math.abs(this.playerData.vY) < considerStoppedWhen) {
        this.playerData.vY = config.minSpeed;
        this.playerData.aY = 0;
      }
    }

    if (this.playerData.gravityAssistData.size === 0 && (Math.abs(this.playerData.bonusVx) > considerStoppedWhen || Math.abs(this.playerData.bonusVy) > considerStoppedWhen)) {
      const newBonusVx = (this.playerData.bonusVx > 0)
        ? Math.max(0, this.playerData.bonusVx - config.gravityAssistReleaseDv * config.dt)
        : Math.min(0, this.playerData.bonusVx + config.gravityAssistReleaseDv * config.dt)
      ;

      const k = Math.abs(this.playerData.bonusVy / this.playerData.bonusVx);
      const newBonusVy = (this.playerData.bonusVy > 0)
        ? Math.max(0, this.playerData.bonusVy - config.gravityAssistReleaseDv * k * config.dt)
        : Math.min(0, this.playerData.bonusVy + config.gravityAssistReleaseDv * k * config.dt)
      ;
      // const newBonusVy = this.playerData.bonusVy * newBonusVx / this.playerData.bonusVx;
      this.playerData.bonusVx = newBonusVx;
      this.playerData.bonusVy = newBonusVy;
    }
  }

  private _checkBoundCollisions() {
    if (this._isXBoundCollision()) {
      this.playerData.vX *= -1;
    }

    if (this._isYBoundCollision()) {
      this.playerData.vY *= -1;
    }
  }

  private _isXBoundCollision() {
    return (this.playerData.x < (config.worldBounds[0] + this.playerData.r))
        ||
      (this.playerData.x > (config.worldBounds[2] - this.playerData.r))
    ;
  }

  private _isYBoundCollision() {
    return (this.playerData.y < (config.worldBounds[1] + this.playerData.r))
        ||
      (this.playerData.y > (config.worldBounds[3] - this.playerData.r))
    ;
  }

  private _rotateAroundPlayers() {
    for (const rotationData of this.playerData.rotationData.values()) {
      const t = config.rotationSpeed * config.dt * rotationData.direction + Math.atan2(
        this.playerData.y - rotationData.y,
        this.playerData.x - rotationData.x
      );
      this.playerData.x = rotationData.x
        + (rotationData.r * Math.cos(t))
      ;
      this.playerData.y = rotationData.y
        + (rotationData.r * Math.sin(t))
      ;
    }
  }

  private _moveInfluencedByPlayers() {
    for (const playerData of this.playerData.boundedToPlayersData.values()) {
      this.playerData.x += playerData.vX * config.dt;
      this.playerData.y += playerData.vY * config.dt;
    }
  }

  private _moveAttractedByPlayers() {
    for (const attractionData of this.playerData.attractionData.values()) {
      const dx = attractionData.x - this.playerData.x;
      const dy = attractionData.y - this.playerData.y;
      /** This is not real world distance
       * But this is value which pretend to work in similar way as real world distance
       * This is "pseudo interaction potential"
       */
      const r = dx ** 2 + dy ** 2 + 1;
      const vX = config.attractionSpeed * dx / r;
      const vY = config.attractionSpeed * dy / r;

      if (Math.abs(dx) < this.playerData.r / 4 && Math.abs(dy) < this.playerData.r / 4) {
        return;
      }

      this.playerData.x += vX * config.dt;
      this.playerData.y += vY * config.dt;
    }
  }

  private _moveByGravityAssist() {
    for (const rotationData of this.playerData.gravityAssistData.values()) {
      const angle = config.gravityAssistRotationSpeed * config.dt;
      const t = angle * rotationData.direction + Math.atan2(
        this.playerData.y - rotationData.y,
        this.playerData.x - rotationData.x
      );
      const oldX = this.playerData.x;
      const newX = rotationData.x
        + (rotationData.r * Math.cos(t))
      ;
      const oldY = this.playerData.y;
      const newY = rotationData.y
        + (rotationData.r * Math.sin(t))
      ;

      if (Math.abs(rotationData.angle) >= Math.PI && !this.playerData.bonusVx && !this.playerData.bonusVy) {
        this.playerData.bonusVx = (newX - oldX) / config.dt / 2;
        this.playerData.bonusVy = (newY - oldY) / config.dt / 2;
        continue;
      }

      this.playerData.x = newX;
      this.playerData.y = newY;
      rotationData.angle += angle;
    }
  }
}

export default Player;
