import firstInteractionZoneHandler from './first';
import secondInteractionZoneHandler from './second';
import thirdInteractionZoneHandler from './third';
import fourthZoneHandler from './fourth';

const zoneHandlers = {
  1: firstInteractionZoneHandler,
  2: secondInteractionZoneHandler,
  3: thirdInteractionZoneHandler,
  4: fourthZoneHandler,
};

const getInteractionZoneHandler = (zoneNumber) => {
  if (zoneHandlers[zoneNumber]) {
    return zoneHandlers[zoneNumber];
  }

  throw new Error('Not implemented');
};

export default getInteractionZoneHandler;
