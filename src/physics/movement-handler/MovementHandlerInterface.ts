import PlayerData from '../../storage/PlayerData';

interface MovementHandlerInterface {
  updatePlayerData(playerData: PlayerData): void;
  getName(): string;
}

export default MovementHandlerInterface;
