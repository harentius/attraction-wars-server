import Player from '../../player/Player';

interface MovementHandlerInterface {
  handle(player: Player): void;
}

export default MovementHandlerInterface;
