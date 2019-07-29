import config from '../config';
import PlayerData from '../storage/PlayerData';
import InteractionZoneSwitcher from '../physics/movement-handler/interaction-zone/InteractionZoneSwitcher';
import MovementHandlerRegistry from '../physics/movement-handler/MovementHandlerRegistry';
import AsteroidData from '../storage/AsteroidData';

class Player {
  public playerData: PlayerData;
  private interactionZoneSwitcher: InteractionZoneSwitcher;
  private movementHandlerRegistry: MovementHandlerRegistry;

  constructor(
    playerData: PlayerData,
    interactionZoneSwitcher: InteractionZoneSwitcher,
    movementHandlerRegistry: MovementHandlerRegistry,
  ) {
    this.playerData = playerData;
    this.interactionZoneSwitcher = interactionZoneSwitcher;
    this.movementHandlerRegistry = movementHandlerRegistry;
  }

  public setAcceleration({ aX, aY }, isAttenuation: boolean = false, isAccelerating: boolean = false) {
    this.playerData.aX = aX;
    this.playerData.aY = aY;
    this.playerData.isAttenuation = isAttenuation;
    this.playerData.isAccelerating = isAccelerating;
  }

  public accelerateReactively() {
    if (this.isStoppedX() && this.isStoppedY()) {
      return;
    }

    if (this.playerData.r < config.minimumR) {
      return;
    }

    this.playerData.reactiveVx += config.reactiveVMultiplier * this.playerData.vX;
    this.playerData.reactiveVy += config.reactiveVMultiplier * this.playerData.vY;
    this.playerData.r *= config.reactiveVRLossMultiplier;
  }

  public isStoppedX() {
    return this.playerData.vX === config.minSpeed;
  }

  public isStoppedY() {
    return this.playerData.vY === config.minSpeed;
  }

  public updateData() {
    this.interactionZoneSwitcher.checkZoneSwitch(this.playerData);

    for (const movementHandler of Object.values(this.movementHandlerRegistry.movementHandlers)) {
      movementHandler.handle(this);
    }
  }

  public increaseScoreByAsteroidAbsorption(asteroidData: AsteroidData) {
    this.playerData.score += asteroidData.r / 2;
  }

  public increaseScoreByMovement() {
    this.playerData.score += 0.0025;
  }
}

export default Player;
