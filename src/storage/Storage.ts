import Player from '../player/Player';
import KeysPressState from '../server/KeysPressState';
import WorldData from './WorldData';
import Client from '../server/Client';
import PointInterface from '../physics/PointInterface';
import CircleInterface from '../physics/CircleInterface';
import isCirclesIntersect from '../physics/utils/isCirclesIntersect';
import config from '../config';

const ATTEMPTS_THRESHOLD = 1000;

class Storage {
  public readonly worldData: WorldData;
  public players: Map<string, Player>;
  private clients: Map<string, Client>;
  private readonly events;
  static get UPDATE_KEY_PRESS_STATE() { return 'update_key_press_state'; }
  static get REMOVE_CLIENT() { return 'remove_client'; }
  static get REMOVE_ASTEROID() { return 'remove_asteroid'; }

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
    this.players.delete(id);
    this.worldData.removePlayerData(id);
    this.worldData.serverStatistics.onlineCount = this.players.size;

    const client = this.clients.get(id);

    if (!client) {
      return;
    }

    this.trigger(Storage.REMOVE_CLIENT, [client]);
    this.clients.delete(id);
  }

  public addPlayer(id: string, player: Player): void {
    this.players.set(id, player);
    this.worldData.addPlayerData(player.playerData);
    this.worldData.serverStatistics.onlineCount = this.players.size;
  }

  public removeAsteroidData(id: string): void {
    this.worldData.removeAsteroidData(id);
    this.trigger(Storage.REMOVE_ASTEROID);
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

  public generateRandomPosition(r: number): PointInterface {
    let attemptCount = 0;

    while (attemptCount < ATTEMPTS_THRESHOLD) {
      const x = Math.random() * this.worldData.worldBounds[2];
      const y = Math.random() * this.worldData.worldBounds[3];

      if (this.isCircleAvailable({x, y, r})) {
        return {x, y};
      }

      attemptCount++;
    }

    throw new Error('Objects limit exceed. World is overpopulated.');
  }

  public on(event, callback) {
    if (typeof this.events[event] === 'undefined') {
      this.events[event] = [];
    }

    this.events[event].push(callback);

    return this;
  }

  public trigger(event, data = []) {
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

  private isCircleAvailable(circle: CircleInterface): boolean {
    for (const playerData of Object.values(this.worldData.playersData)) {
      if (isCirclesIntersect(circle, playerData)) {
        return false;
      }
    }

    for (const asteroidData of Object.values(this.worldData.asteroidsData)) {
      const asteroidInfluenceCircle = {
        ...asteroidData,
        r: asteroidData.r * config.asteroidAttractionRadiusMultiplier,
      };

      if (isCirclesIntersect(circle, asteroidInfluenceCircle)) {
        return false;
      }
    }

    return true;
  }
}

export default Storage;
