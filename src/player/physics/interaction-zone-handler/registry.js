const firstInteractionZoneHandler = require('./first');
const secondInteractionZoneHandler = require('./second');
const thirdInteractionZoneHandler = require('./third');
const fourthZoneHandler = require('./fourth');

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

module.exports = getInteractionZoneHandler;
