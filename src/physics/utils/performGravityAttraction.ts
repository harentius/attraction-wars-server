import CircleInterface from '../CircleInterface';
import PointInterface from '../PointInterface';
import config from '../../config';

const performGravityAttraction = (attractingObject: CircleInterface, gravityCenter: PointInterface) => {
  const dx = gravityCenter.x - attractingObject.x;
  const dy = gravityCenter.y - attractingObject.y;
  /** This is not real world distance
   * But this is value which pretend to work in similar way as real world distance
   * This is "pseudo interaction potential"
   */
  const r = dx ** 2 + dy ** 2 + 1;
  const vX = config.attractionSpeed * dx / r;
  const vY = config.attractionSpeed * dy / r;

  if (Math.abs(dx) < attractingObject.r / 4 && Math.abs(dy) < attractingObject.r / 4) {
    return;
  }

  attractingObject.x += vX * config.dt;
  attractingObject.y += vY * config.dt;
};

export default performGravityAttraction;
