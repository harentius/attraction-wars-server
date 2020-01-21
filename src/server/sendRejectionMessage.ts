import * as logger from 'winston';

const sendRejectionMessage = (socket) => {
  socket.emit('notification', {
    type: 'error',
    message: 'Server is overloaded. Please try again later.',
  });
  logger.warn('Server is overloaded. Player was rejected to connect');
  socket.disconnect();
};

export default sendRejectionMessage;
