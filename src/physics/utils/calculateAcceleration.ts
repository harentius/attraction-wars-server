import config from '../../config';
import KeysPressState from '../../server/KeysPressState';

const calculateAcceleration = (player, oldKeysPressState: KeysPressState, newKeysPressState: KeysPressState) => {
  const isAnyMoveKeyPressed = newKeysPressState.isAnyMoveKeyPressed();
  let dv = { aX: 0, aY: 0 };

  if (isAnyMoveKeyPressed) {
    if (newKeysPressState.up) {
      dv = { aX: 0, aY: -config.keyPressDv };
    } else if (newKeysPressState.down) {
      dv = { aX: 0, aY: config.keyPressDv };
    } else if (newKeysPressState.left) {
      dv = { aX: -config.keyPressDv, aY: 0 };
    } else if (newKeysPressState.right) {
      dv = { aX: config.keyPressDv, aY: 0 };
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
