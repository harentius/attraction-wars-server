const getInteractionZoneHandler = require('./interaction-zone-handler/registry');

class Physics {
  constructor(storage) {
    this._storage = storage;
  }

  checkZoneSwitch(playerData) {
    const { playersData } = this._storage.worldData;

    for (const otherPlayerData of Object.values(playersData)) {
      if (otherPlayerData.id === playerData.id) {
        continue;
      }

      const interactionZonePlayerIntoOtherPlayer = this._getInteractionZone(
        playerData,
        otherPlayerData,
      );

      const interactionZoneOtherPlayerIntoPlayer = this._getInteractionZone(
        otherPlayerData,
        playerData,
      );

      if (interactionZonePlayerIntoOtherPlayer <= interactionZoneOtherPlayerIntoPlayer) {
        const interactionZoneHandler = getInteractionZoneHandler(
          interactionZonePlayerIntoOtherPlayer,
        );
        interactionZoneHandler(playerData, otherPlayerData);
      }
    }
  }

  // First zone is closest to player circle
  _getInteractionZone(playerData, otherPlayerData) {
    // Check is first zone.
    let i = 0;

    for (const RofZone of [1.5, 2.5, 3.5]) {
      i++;
      const { x, y, r } = otherPlayerData;
      const circle = { x, y, r: RofZone * r };

      if (this._circleContain(circle, playerData.x, playerData.y)) {
        return i;
      }
    }

    return 4;
  }

  _circleContain(circle, x, y) {
    const right = circle.x + circle.r;
    const left = circle.x - circle.r;
    const top = circle.y - circle.r;
    const bottom = circle.y + circle.r;

    if (x >= left && x <= right && y >= top && y <= bottom) {
      const dx = (circle.x - x) * (circle.x - x);
      const dy = (circle.y - y) * (circle.y - y);

      return (dx + dy) <= (circle.r * circle.r);
    }

    return false;
  }
}

module.exports = Physics;
