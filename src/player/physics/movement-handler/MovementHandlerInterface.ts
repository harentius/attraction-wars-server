import PlayerData from '../../PlayerData';

interface MovementHandlerInterface {
  updatePlayerData(playerData: PlayerData): void;
  getName(): string;
}

export default MovementHandlerInterface;
