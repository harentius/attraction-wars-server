import Player from '../player/Player';
import KeysPressState from '../server/KeysPressState';
import WorldData from './WorldData';
import Client from '../server/Client';
import PointInterface from '../physics/PointInterface';
import CircleInterface from '../physics/CircleInterface';
import isCirclesIntersect from '../physics/utils/isCirclesIntersect';
import config from '../config';
import WorldDataFilter from './Filter/WorldDataFilter';
import AsteroidData from './AsteroidData';

const ATTEMPTS_THRESHOLD = 1000;
const BORDER_MARGIN = 5;

class Storage {
  public readonly worldData: WorldData;
  public players: Map<string, Player>;
  private clients: Map<string, Client>;
  private readonly worldDataFilter: WorldDataFilter;
  private readonly events;
  static get UPDATE_KEY_PRESS_STATE() { return 'update_key_press_state'; }

  static get ADD_PLAYER() { return 'add_player'; }
  static get REMOVE_CLIENT() { return 'remove_client'; }

  static get ADD_ASTEROID() { return 'add_asteroid'; }
  static get REMOVE_ASTEROID() { return 'remove_asteroid'; }


  constructor(worldData: WorldData, worldDataFilter: WorldDataFilter) {
    this.worldData = worldData;
    this.players = new Map();
    this.clients = new Map();
    this.events = {};
    this.worldDataFilter = worldDataFilter;
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
    this.trigger(Storage.ADD_PLAYER, [player]);
  }

  public addAsteroidData(asteroidData: AsteroidData) {
    this.worldData.addAsteroidData(asteroidData);
    this.trigger(Storage.ADD_ASTEROID, [asteroidData]);
  }

  public removeAsteroidData(id: string): void {
    this.worldData.removeAsteroidData(id);
    this.trigger(Storage.REMOVE_ASTEROID);
  }

  public getPlayerDataForClient(id: string) {
    return this.worldData.playersData[id];
  }

  public getFullWorldDataForClient(): WorldData {
    // TODO: filter
    return this.worldData;
  }

  public getWorldDataForClient(): object {
    return this.worldDataFilter.filter(this.worldData);
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
      const x = Math.random() * (this.worldData.worldBounds[2] - r - BORDER_MARGIN) + r + BORDER_MARGIN;
      const y = Math.random() * (this.worldData.worldBounds[3] - r - BORDER_MARGIN) + r + BORDER_MARGIN;

      if (this.isCircleAvailable({x, y, r})) {
        return {x, y};
      }

      attemptCount++;
    }

    throw new Error('Objects limit exceed. World is overpopulated.');
  }

  public on(events, callback) {
    if (typeof events === 'string') {
      events = [events];
    }

    for (const event of events) {
      if (typeof this.events[event] === 'undefined') {
        this.events[event] = [];
      }

      this.events[event].push(callback);
    }

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

  public getClient(id: string) {
    return this.clients.get(id);
  }

  public getPlayer(id: string): Player {
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
