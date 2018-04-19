class Storage {
  static get UPDATE_KEY_PRESS_STATE() { return 'update_key_press_state'; }

  constructor(worldData) {
    this.worldData = worldData;
    this._clients = new Map();
    this.players = new Map();
    this._events = {};
  }

  addClient(id, client) {
    this._clients.set(id, client);
  }

  getClient(id) {
    return this._clients.get(id);
  }

  addPlayer(id, player) {
    this.players.set(id, player);
    this.worldData.addPlayerData(player.playerData);
  }

  removeClient(id) {
    this.players.delete(id);
    this.worldData.removePlayerData(id);
  }

  getPlayer(id) {
    return this.players.get(id);
  }

  getWorldDataForClient() {
    // TODO: filter data which users receives
    return this.worldData;
  }

  updateKeyPressState(id, keyPressState) {
    this.trigger(
      Storage.UPDATE_KEY_PRESS_STATE,
      [this.getPlayer(id), this.getClient(id).keyPressState, keyPressState],
    );
    Object.assign(this.getClient(id).keyPressState, keyPressState);
  }

  on(event, callback) {
    if (typeof this._events[event] === 'undefined') {
      this._events[event] = [];
    }

    this._events[event].push(callback);

    return this;
  }

  trigger(event, data) {
    if (typeof this._events[event] === 'undefined') {
      return;
    }

    for (const callback of this._events[event]) {
      callback.apply(this, data);
    }
  }
}

module.exports = Storage;
