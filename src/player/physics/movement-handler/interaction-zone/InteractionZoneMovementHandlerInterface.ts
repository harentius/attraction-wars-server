import MovementHandlerInterface from '../MovementHandlerInterface';
import { PlayerData } from '../../../PlayerData';

interface InteractionZoneMovementHandlerInterface extends MovementHandlerInterface {
  updateMovementHandlerData(playerData: PlayerData, otherPlayerData: PlayerData): void;
  getInteractionZoneNumber(): number;
}

export default InteractionZoneMovementHandlerInterface;
