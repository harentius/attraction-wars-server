import MovementHandlerInterface from '../MovementHandlerInterface';
import PlayerData from '../../../storage/PlayerData';
import Player from '../../../player/Player';

interface InteractionZoneMovementHandlerInterface extends MovementHandlerInterface {
  updateMovementHandlerData(player: Player, otherPlayerData: PlayerData): void;
  getInteractionZoneNumber(): number;
}

export default InteractionZoneMovementHandlerInterface;
