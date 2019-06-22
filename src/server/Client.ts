import KeysPressState from './KeysPressState';

class Client {
  public socket: any;
  public keyPressState: KeysPressState;

  constructor(socket, keyPressState) {
    this.socket = socket;
    this.keyPressState = keyPressState;
  }
}

export default Client;
