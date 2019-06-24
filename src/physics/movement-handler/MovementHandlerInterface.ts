import PlayerData from '../../storage/PlayerData';

interface MovementHandlerInterface {
  updatePlayerData(playerData: PlayerData): void;
}

export default MovementHandlerInterface;
