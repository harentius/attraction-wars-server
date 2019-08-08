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

const server = new Server();
// tslint:disable-next-line
const io = require('socket.io')(server, { parser });
const socketIdToPlayerIdMap = new Map();

io.on('connection', (socket) => {
  socket = socket.binary(true);

  socket.on('login', (username) => {
    const player = game.addPlayerOnRandomPosition(username);
    const playerId = player.playerData.id;
    socketIdToPlayerIdMap.set(socket.id, playerId);
    const client = new Client(socket, new KeysPressState());

    storage.addClient(playerId, client);
    logger.info(`Client '${socket.handshake.address}' connected. Socket id: ${socket.id}, Assigned id: ${playerId}`);
    socket.emit('playerData', storage.getPlayerDataForClient(playerId));
    socket.volatile.emit('worldData', storage.getFullWorldDataForClient());
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
});

storage.on(Storage.REMOVE_CLIENT, (client: Client) => {
  client.socket.disconnect();
});

storage.on([Storage.ADD_ASTEROID, Storage.REMOVE_ASTEROID, Storage.ADD_PLAYER, Storage.REMOVE_CLIENT], () => {
  io.binary(true).volatile.emit('worldData', storage.getFullWorldDataForClient());
});

const asteroidSyncIntervals = {};

storage.on(Storage.ASTEROID_ATTRACTION_START, (asteroidData: AsteroidData) => {
  if (!asteroidSyncIntervals[asteroidData.id]) {
    asteroidSyncIntervals[asteroidData.id] = setInterval(() => {
      io.binary(true).volatile.emit('asteroidData', {
        id: asteroidData.id,
        x: asteroidData.x,
        y: asteroidData.y,
      });
    }, config.broadCastPeriod);
  }
});

storage.on(Storage.ASTEROID_ATTRACTION_STOP, (asteroidData: AsteroidData) => {
  if (asteroidSyncIntervals[asteroidData.id]) {
    clearInterval(asteroidSyncIntervals[asteroidData.id]);
    delete asteroidSyncIntervals[asteroidData.id];
  }
});

setInterval(() => {
  io.binary(true).volatile.emit('worldData', storage.getWorldDataForClient());
}, config.broadCastPeriod);

server.listen(config.port, () => logger.info('Attraction Wars server started'));
