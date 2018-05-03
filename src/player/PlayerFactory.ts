import Player from './Player';
import { PlayerData } from './PlayerData';
import InteractionZoneSwitcher from './physics/InteractionZoneSwitcher';
import MovementHandlerRegistry from './physics/movement-handler/MovementHandlerRegistry';

class PlayerFactory {
  private readonly interactionZoneSwitcher: InteractionZoneSwitcher;
  private readonly movementHandlerRegistry: MovementHandlerRegistry;

  public constructor(
    interactionZoneSwitcher: InteractionZoneSwitcher,
    movementHandlerRegistry: MovementHandlerRegistry
  ) {
    this.interactionZoneSwitcher = interactionZoneSwitcher;
    this.movementHandlerRegistry = movementHandlerRegistry;
  }

  public createPlayer(playerData: PlayerData) {
    return new Player(playerData, this.interactionZoneSwitcher, this.movementHandlerRegistry);
  }
}

export default PlayerFactory;
