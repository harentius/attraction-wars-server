import config from '../config';
import PlayerData from '../storage/PlayerData';
import InteractionZoneSwitcher from '../physics/movement-handler/interaction-zone/InteractionZoneSwitcher';
import MovementHandlerRegistry from '../physics/movement-handler/MovementHandlerRegistry';
import AsteroidData from '../storage/AsteroidData';

class Player {
  public playerData: PlayerData;
  private interactionZoneSwitcher: InteractionZoneSwitcher;
  private movementHandlerRegistry: MovementHandlerRegistry;
  private thirdZoneBufferScore: number;
  private secondZoneBufferScore: number;

  constructor(
    playerData: PlayerData,
    interactionZoneSwitcher: InteractionZoneSwitcher,
    movementHandlerRegistry: MovementHandlerRegistry,
  ) {
    this.playerData = playerData;
    this.interactionZoneSwitcher = interactionZoneSwitcher;
    this.movementHandlerRegistry = movementHandlerRegistry;
    this.thirdZoneBufferScore = 0;
    this.secondZoneBufferScore = 0;
  }

  public setAcceleration(
    { aX, aY },
    isAttenuationX: boolean = false,
    isAttenuationY: boolean = false,
    isAccelerating: boolean = false,
  ) {
    this.playerData.aX = aX;
    this.playerData.aY = aY;
    this.playerData.isAttenuationX = isAttenuationX;
    this.playerData.isAttenuationY = isAttenuationY;
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
    this.increaseScoreByAcceleration();
  }

  public isStoppedX() {
    return this.playerData.vX === config.minSpeed;
  }

  public isStoppedY() {
    return this.playerData.vY === config.minSpeed;
  }

  public updateData() {
    this.interactionZoneSwitcher.checkZoneSwitch(this);

    for (const movementHandler of Object.values(this.movementHandlerRegistry.movementHandlers)) {
      movementHandler.handle(this);
    }
  }

  public increaseBufferScoreByThirdZone(): void {
    const bufferOverflow = 50;
    this.thirdZoneBufferScore += 0.2;

    if (this.thirdZoneBufferScore > bufferOverflow) {
      this.playerData.score += bufferOverflow;
      this.thirdZoneBufferScore = 0;
    }
  }

  public increaseBufferScoreBySecondZone(score: number = 3): void {
    const bufferOverflow = 150;
    this.secondZoneBufferScore += score;

    if (this.secondZoneBufferScore > bufferOverflow) {
      this.playerData.score += bufferOverflow;
      this.secondZoneBufferScore = 0;
    }
  }

  public increaseScoreByAsteroidAbsorption(asteroidData: AsteroidData): void {
    const multiplier = this.isTooBig() ? 1 : 0.5;
    this.playerData.score += multiplier * asteroidData.r;
  }

  public increaseScoreByOtherPlayerAbsorption(playerData: PlayerData): void {
    const multiplier = this.isTooBig() ? 8 : 4;
    this.playerData.score += multiplier * playerData.r;
  }

  public increaseScoreByMovement(): void {
    this.playerData.score += 0.0025;
  }

  public increaseScoreByAcceleration(): void {
    this.playerData.score += 10;
  }

  public isTooBig(): boolean {
    return this.playerData.r > config.worldBounds[2] * config.tooBigMultiplier;
  }

  public increaseSize(value: number): void {
    if (!this.isTooBig()) {
      const size = this.playerData.r + value;
      this.playerData.r = Math.min(size, config.worldBounds[2] * config.tooBigMultiplier);
    }
  }
}

export default Player;
