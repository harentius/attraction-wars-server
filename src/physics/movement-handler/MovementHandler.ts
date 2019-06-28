import MovementHandlerInterface from './MovementHandlerInterface';
import config from '../../config';
import {getValueNotViolatingBounds} from '../../utils';
import Player from '../../player/Player';

class MovementHandler implements MovementHandlerInterface {
  public handle(player: Player): void {
    const playerData = player.playerData;

    let newVx: number;
    let newVy: number;

    if (playerData.isAttenuation) {
      newVx = (playerData.vX > 0)
        ? Math.max(0, playerData.vX + playerData.aX * config.dt)
        : Math.min(0, playerData.vX + playerData.aX * config.dt)
      ;

      newVy = (playerData.vY > 0)
        ? Math.max(0, playerData.vY + playerData.aY * config.dt)
        : Math.min(0, playerData.vY + playerData.aY * config.dt)
      ;
    } else {
      newVx = playerData.vX + playerData.aX * config.dt;
      newVy = playerData.vY + playerData.aY * config.dt;
    }

    playerData.vX = getValueNotViolatingBounds(
      newVx,
      -config.maxMovementSpeed,
      config.maxMovementSpeed,
    );
    playerData.vY = getValueNotViolatingBounds(
      newVy,
      -config.maxMovementSpeed,
      config.maxMovementSpeed,
    );

    const considerStoppedWhen = config.considerStoppedWhen;

    if (playerData.isAttenuation) {
      if (Math.abs(playerData.vX) < considerStoppedWhen) {
        playerData.vX = config.minSpeed;
        playerData.aX = 0;
      }

      if (Math.abs(playerData.vY) < considerStoppedWhen) {
        playerData.vY = config.minSpeed;
        playerData.aY = 0;
      }
    }

    playerData.x += (playerData.vX + playerData.bonusVx + playerData.reactiveVx) * config.dt;
    playerData.y += (playerData.vY + playerData.bonusVy + playerData.reactiveVy) * config.dt;

    if (Math.abs(playerData.reactiveVx) > considerStoppedWhen) {
      playerData.reactiveVx *= config.reactiveVAttenuation;
    }

    if (Math.abs(playerData.reactiveVy) > considerStoppedWhen) {
      playerData.reactiveVy *= config.reactiveVAttenuation;
    }
  }
}

export default MovementHandler;
