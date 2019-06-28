import Player from '../player/Player';
import KeysPressState from '../server/KeysPressState';
import WorldData from './WorldData';
import Client from '../server/Client';

class Storage {
  public readonly worldData: WorldData;
  public players: Map<string, Player>;
  private clients: Map<string, Client>;
  private readonly events;
  static get UPDATE_KEY_PRESS_STATE() { return 'update_key_press_state'; }
  static get REMOVE_CLIENT() { return 'remove_client'; }

  constructor(worldData: WorldData) {
    this.worldData = worldData;
    this.players = new Map();
    this.clients = new Map();
    this.events = {};
  }

  public addClient(id: string, client: Client) {
    this.clients.set(id, client);
  }

  public removeClient(id: string) {
    this.trigger(Storage.REMOVE_CLIENT, [this.clients.get(id)]);
    this.players.delete(id);
    this.worldData.removePlayerData(id);
    this.clients.delete(id);
  }

  public addPlayer(id: string, player: Player): void {
    this.players.set(id, player);
    this.worldData.addPlayerData(player.playerData);
  }

  public removeAsteroidData(id: string): void {
    this.worldData.removeAsteroidData(id);
  }

  public getPlayerDataForClient(id: string) {
    // TODO: filter data which users receives
    return this.worldData.playersData[id];
  }

  public getWorldDataForClient(): WorldData {
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

  private getClient(id: string) {
    return this.clients.get(id);
  }

  private getPlayer(id: string): Player {
    return this.players.get(id);
  }
}

export default Storage;
