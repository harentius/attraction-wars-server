import config from '../../config';
import KeysPressState from '../../server/KeysPressState';

const calculateAcceleration = (player, oldKeysPressState: KeysPressState, newKeysPressState: KeysPressState) => {
  let dv = { aX: 0, aY: 0 };

  if (newKeysPressState.left || newKeysPressState.right) {
    if (newKeysPressState.left) {
      dv.aX = -config.keyPressDv;
    }

    if (newKeysPressState.right) {
      dv.aX = config.keyPressDv;
    }
  } else if (!player.isStoppedX()) {
    dv.aX = player.isStoppedX() ? 0 : config.releaseDv * (player.playerData.vX > 0 ? -1 : 1);
  }

  if (newKeysPressState.down || newKeysPressState.up) {
    if (newKeysPressState.up) {
      dv.aY = -config.keyPressDv;
    }

    if (newKeysPressState.down) {
      dv.aY = config.keyPressDv;
    }
  } else if (!player.isStoppedY()) {
    dv.aY = player.isStoppedY() ? 0 : config.releaseDv * (player.playerData.vY > 0 ? -1 : 1);
  }

  return dv;
};

export default calculateAcceleration;
