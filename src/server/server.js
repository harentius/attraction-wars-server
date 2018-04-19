const KeysPressState = require('./KeysPressState');
const Client = require('./client');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { game, storage } = require('../app');
const config = require('../config');
const KeyPressState = require('./KeysPressState');

const socketIdToPlayerIdMap = new Map();

io.on('connection', (socket) => {
  const player = game.addPlayer();
  socketIdToPlayerIdMap.set(socket.id, player.playerData.id);
  const client = new Client(socket, new KeysPressState());

  storage.addClient(player.playerData.id, client);
  console.log(`Client '${socket.handshake.address}' connected. Socket id: ${socket.id}, Assigned id: ${player.playerData.id}`);
  socket.emit('playerData', player.playerData);

  socket.on('keysPressState', (keyPressStateData) => {
    storage.updateKeyPressState(
      socketIdToPlayerIdMap.get(socket.id),
      new KeyPressState(keyPressStateData),
    );
  });

  socket.on('disconnect', () => {
    const id = socketIdToPlayerIdMap.get(socket.id);
    console.log(`Client '${socket.handshake.address}' disconnected. Socket id: ${socket.id}, Assigned id: ${id}`);
    storage.removeClient(id);
  });
});

setInterval(() => {
  io.emit('worldData', storage.getWorldDataForClient());
}, config.broadCastPeriod);

server.listen(config.port, () => console.log('Attraction Wars server started'));

