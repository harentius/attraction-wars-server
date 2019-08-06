import * as logger from 'winston';
import KeysPressState from './KeysPressState';
import Client from './Client';
import * as express from 'express';
import { Server } from 'http';
import * as SocketIO from 'socket.io';
import { game, storage } from '../app';
import config from '../config';
import KeyPressState from './KeysPressState';
import Storage from '../storage/Storage';

const app = express();
const server = new Server(app);
const io = SocketIO(server);
const socketIdToPlayerIdMap = new Map();

io.on('connection', (socket) => {
  socket.on('login', (username) => {
    const player = game.addPlayerOnRandomPosition(username);
    const playerId = player.playerData.id;
    socketIdToPlayerIdMap.set(socket.id, playerId);
    const client = new Client(socket, new KeysPressState());

    storage.addClient(playerId, client);
    logger.info(`Client '${socket.handshake.address}' connected. Socket id: ${socket.id}, Assigned id: ${playerId}`);
    socket.emit('playerData', storage.getPlayerDataForClient(playerId));
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

setInterval(() => {
  io.volatile.emit('worldData', storage.getWorldDataForClient());
}, config.broadCastPeriod);

server.listen(config.port, () => logger.info('Attraction Wars server started'));
