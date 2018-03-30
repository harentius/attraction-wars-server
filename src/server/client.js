class Client {
  constructor(socket, keyPressState) {
    this.socket = socket;
    this.keyPressState = keyPressState;
  }
}

module.exports = Client;
