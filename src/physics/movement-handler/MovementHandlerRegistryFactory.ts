import MovementHandlerRegistry from './MovementHandlerRegistry';
import FirstInteractionZoneHandler from './interaction-zone/first/FirstInteractionZoneHandler';
import ThirdInteractionZoneHandler from './interaction-zone/third/ThirdInteractionZoneHandler';
import FourthInteractionZoneHandler from './interaction-zone/fourth/FourthInteractionZoneHandler';
import SecondInteractionZoneHandler from './interaction-zone/second/SecondInteractionZoneHandler';
import MovementHandler from './MovementHandler';
import InfluencedPlayersMovementHandler from './influenced-players/InfluencedPlayersMovementHandler';
import CheckBoundCollisionMovementHandler from './boundary/CheckBoundCollisionMovementHandler';
import CheckAbsorptionMovementHandler from './asteroid/CheckAbsorptionMovementHandler';
import Storage from '../../storage/Storage';

class MovementHandlerRegistryFactory {
  private readonly storage: Storage;

  public constructor(storage: Storage) {
    this.storage = storage;
  }

  public createMovementHandlerRegistry(): MovementHandlerRegistry {
    const movementHandlerRegistry = new MovementHandlerRegistry();
    movementHandlerRegistry
      .registerInteractionZoneMovementHandler(new FirstInteractionZoneHandler())
      .registerInteractionZoneMovementHandler(new SecondInteractionZoneHandler())
      .registerInteractionZoneMovementHandler(new ThirdInteractionZoneHandler())
      .registerInteractionZoneMovementHandler(new FourthInteractionZoneHandler())
      .registerMovementHandler(new MovementHandler())
      .registerMovementHandler(new InfluencedPlayersMovementHandler())
      .registerMovementHandler(new CheckBoundCollisionMovementHandler())
      .registerMovementHandler(new CheckAbsorptionMovementHandler(this.storage))
    ;

    return movementHandlerRegistry;
  }
}

export default MovementHandlerRegistryFactory;
