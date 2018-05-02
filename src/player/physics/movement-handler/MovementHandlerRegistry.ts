import MovementHandlerInterface from './MovementHandlerInterface';
import InteractionZoneMovementHandlerInterface from './interaction-zone/InteractionZoneMovementHandlerInterface';

class MovementHandlerRegistry {
  public readonly movementHandlers: Map<string, MovementHandlerInterface>;
  public readonly interactionZoneMovementHandlers: Map<string, InteractionZoneMovementHandlerInterface>;

  public constructor() {
    this.movementHandlers = new Map<string, MovementHandlerInterface>();
    this.interactionZoneMovementHandlers = new Map<string, InteractionZoneMovementHandlerInterface>();
  }

  public registerMovementHandler(handler: MovementHandlerInterface) {
    this.movementHandlers.set(handler.getName(), handler);

    return this;
  }

  public registerInteractionZoneMovementHandler(handler: InteractionZoneMovementHandlerInterface) {
    this.movementHandlers.set(handler.getName(), handler);
    this.interactionZoneMovementHandlers.set(handler.getName(), handler);

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
