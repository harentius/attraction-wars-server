const thirdInteractionZoneHandler = require('./third');
const defaultInteractionZoneHandler = require('./default');

const zoneHandlers = {
  3: thirdInteractionZoneHandler,
};

const getInteractionZoneHandler = (zoneNumber) => {
  if (zoneHandlers[zoneNumber]) {
    return zoneHandlers[zoneNumber];
  }

  return defaultInteractionZoneHandler;
};

module.exports = getInteractionZoneHandler;
