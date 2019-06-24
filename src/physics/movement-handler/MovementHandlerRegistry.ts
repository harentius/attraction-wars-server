import MovementHandlerInterface from './MovementHandlerInterface';
import InteractionZoneMovementHandlerInterface from './interaction-zone/InteractionZoneMovementHandlerInterface';

class MovementHandlerRegistry {
  public readonly movementHandlers: MovementHandlerInterface[];
  private readonly interactionZoneMovementHandlers: InteractionZoneMovementHandlerInterface[];

  public constructor() {
    this.movementHandlers = [];
    this.interactionZoneMovementHandlers = [];
  }

  public registerMovementHandler(handler: MovementHandlerInterface) {
    this.movementHandlers.push(handler);

    return this;
  }

  public registerInteractionZoneMovementHandler(handler: InteractionZoneMovementHandlerInterface) {
    this.movementHandlers.push(handler);
    this.interactionZoneMovementHandlers.push(handler);

    return this;
  }

  public getInteractionZoneMovementHandler(zoneNumber: number): InteractionZoneMovementHandlerInterface | null {
    for (const interactionZoneMovementHandler of this.interactionZoneMovementHandlers.values()) {
      if (interactionZoneMovementHandler.getInteractionZoneNumber() === zoneNumber) {
        return interactionZoneMovementHandler;
      }
    }

    return null;
  }
}

export default MovementHandlerRegistry;
