import * as logger from 'winston';
import * as parser from 'socket.io-msgpack-parser';
import KeysPressState from './KeysPressState';
import Client from './Client';
import { Server } from 'http';
import { game, storage } from '../app';
import config from '../config';
import KeyPressState from './KeysPressState';
import Storage from '../storage/Storage';
import AsteroidData from '../storage/AsteroidData';
import {truncateFloat} from '../utils';
import sendRejectionMessage from './sendRejectionMessage';

const server = new Server();
// tslint:disable-next-line
const io = require('socket.io')(server, { parser });
const socketIdToPlayerIdMap = new Map();

// Asteroid animation loop start
const asteroidSyncIntervals = {};
const asteroidSyncIntervalsTimes = {};

storage.on(Storage.ASTEROID_ATTRACTION_START, (asteroidData: AsteroidData) => {
  if (!asteroidSyncIntervals[asteroidData.id]) {
    asteroidSyncIntervals[asteroidData.id] = setInterval(() => {
      io.binary(true).volatile.emit('asteroidData', {
        id: asteroidData.id,
        x: truncateFloat(asteroidData.x),
        y: truncateFloat(asteroidData.y),
      });
    }, config.broadCastPeriod);
    asteroidSyncIntervalsTimes[asteroidData.id] = Date.now();
  }
});

const cleanAsteroidAttractionInterval = (asteroidDataId) => {
  clearInterval(asteroidSyncIntervals[asteroidDataId]);
  delete asteroidSyncIntervals[asteroidDataId];
  delete asteroidSyncIntervalsTimes[asteroidDataId];
};

storage.on(Storage.ASTEROID_ATTRACTION_STOP, (asteroidData: AsteroidData) => {
  if (asteroidSyncIntervals[asteroidData.id]) {
    cleanAsteroidAttractionInterval(asteroidData.id);
  }
});
// Asteroid animation cycle end

// Clean stalled clients
const heartbeatTimes = {};

const cleanStalledClients = () => {
  for (const clientId of storage.clients.keys()) {
    if ((heartbeatTimes[clientId] + config.heartbeatWaitTime) < Date.now())  {
      storage.removeClient(clientId);
    }
  }

  for (const [asteroidDataId, timestamp] of Object.entries(asteroidSyncIntervalsTimes)) {
    if ((timestamp as number + config.heartbeatWaitTime) < Date.now()) {
      cleanAsteroidAttractionInterval(asteroidDataId);
    }
  }
};

setInterval(cleanStalledClients, config.heartbeatWaitTime);

io.on('connection', (socket) => {
  socket = socket.binary(true);

  if (storage.players.size >= config.maxPlayers) {
    sendRejectionMessage(socket);

    return;
  }

  socket.on('login', (username: string) => {
    // Dummy sanitize user input
    username = `${username}`;

    try {
      const player = game.addPlayerOnRandomPosition(username);
      const playerId = player.playerData.id;
      socketIdToPlayerIdMap.set(socket.id, playerId);
      const client = new Client(socket, new KeysPressState());
      heartbeatTimes[playerId] = Date.now();

      storage.addClient(playerId, client);
      logger.info(`Client '${socket.handshake.address}' connected. Socket id: ${socket.id}, Assigned id: ${playerId}`);
      socket.emit('playerData', storage.getPlayerDataForClient(playerId));
      socket.emit('fullWorldData', storage.getFullWorldDataForClient());
    } catch (e) {
      sendRejectionMessage(socket);
      logger.warn(e.message);
    }
  });

  socket.on('keysPressState', (keyPressStateData) => {
    storage.updateKeyPressState(
      socketIdToPlayerIdMap.get(socket.id),
      new KeyPressState(keyPressStateData),
    );
  });

  socket.on('disconnect', () => {
    const id = socketIdToPlayerIdMap.get(socket.id);
    logger.info(`Client '${socket.handshake.address}' disconnected. Socket id: ${socket.id}, Assigned id: ${id}`);
    storage.removeClient(id);
  });

  socket.on('heartbeat', () => {
    const playerId = socketIdToPlayerIdMap.get(socket.id);
    heartbeatTimes[playerId] = Date.now();
  });
});

storage.on(Storage.ADD_PLAYER, () => {
  io.binary(true).emit('serverStatisticsData', storage.getServerStatistics());
});

storage.on(Storage.REMOVE_CLIENT, (client: Client) => {
  const playerId = socketIdToPlayerIdMap.get(client.socket.id);
  client.socket.disconnect();
  socketIdToPlayerIdMap.delete(playerId);
  delete heartbeatTimes[playerId];
  io.binary(true).emit('serverStatisticsData', storage.getServerStatistics());
});

storage.on([Storage.ADD_ASTEROID, Storage.REMOVE_ASTEROID, Storage.ADD_PLAYER, Storage.REMOVE_CLIENT], () => {
  io.binary(true).emit('worldData', storage.getFullWorldDataForClient());
});

setInterval(() => {
  io.binary(true).volatile.emit('worldData', storage.getWorldDataForClient());
}, config.broadCastPeriod);

server.listen(config.port, () => logger.info('Attraction Wars server started'));
