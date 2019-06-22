import Player from '../player/Player';
import KeysPressState from '../server/KeysPressState';
import WorldData from './WorldData';

class Storage {
  public worldData: WorldData;
  public players: Map<string, Player>;
  private clients: Map<string, any>;
  private events: {};
  static get UPDATE_KEY_PRESS_STATE() { return 'update_key_press_state'; }

  constructor(worldData: WorldData) {
    this.worldData = worldData;
    this.players = new Map();
    this.clients = new Map();
    this.events = {};
  }

  public addClient(id: string, client) {
    this.clients.set(id, client);
  }

  public getClient(id: string) {
    return this.clients.get(id);
  }

  public getPlayerDataForClient(id: string) {
    // TODO: filter data which users receives
    return this.worldData.playersData[id];
  }

  public addPlayer(id: string, player) {
    this.players.set(id, player);
    this.worldData.addPlayerData(player.playerData);
  }

  public removeClient(id: string) {
    this.players.delete(id);
    this.worldData.removePlayerData(id);
  }

  public getPlayer(id: string) {
    return this.players.get(id);
  }

  public getWorldDataForClient() {
    // TODO: filter data which users receives
    return this.worldData;
  }

  public updateKeyPressState(id: string, keyPressState: KeysPressState) {
    const client = this.getClient(id);

    if (!client) {
      return;
    }

    this.trigger(
      Storage.UPDATE_KEY_PRESS_STATE,
      [this.getPlayer(id), client.keyPressState, keyPressState],
    );
    Object.assign(client.keyPressState, keyPressState);
  }

  public on(event, callback) {
    if (typeof this.events[event] === 'undefined') {
      this.events[event] = [];
    }

    this.events[event].push(callback);

    return this;
  }

  public trigger(event, data) {
    if (typeof this.events[event] === 'undefined') {
      return;
    }

    for (const callback of this.events[event]) {
      callback.apply(this, data);
    }
  }
}

export default Storage;
