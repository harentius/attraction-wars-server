import config from '../../config';
import KeysPressState from '../../server/KeysPressState';

const calculateAcceleration = (player, oldKeysPressState: KeysPressState, newKeysPressState: KeysPressState) => {
  const isAnyMoveKeyPressed = newKeysPressState.isAnyMoveKeyPressed();
  let dv = { aX: 0, aY: 0 };

  if (isAnyMoveKeyPressed) {
    if (newKeysPressState.up) {
      dv.aY = -config.keyPressDv;
    }

    if (newKeysPressState.down) {
      dv.aY = config.keyPressDv;
    }

    if (newKeysPressState.left) {
      dv.aX = -config.keyPressDv;
    }

    if (newKeysPressState.right) {
      dv.aX = config.keyPressDv;
    }
  } else if (!player.isStoppedX() || !player.isStoppedY()) {
    dv = {
      aX: player.isStoppedX() ? 0 : config.releaseDv * (player.playerData.vX > 0 ? -1 : 1),
      aY: player.isStoppedY() ? 0 : config.releaseDv * (player.playerData.vY > 0 ? -1 : 1),
    };
  }

  return dv;
};

export default calculateAcceleration;
