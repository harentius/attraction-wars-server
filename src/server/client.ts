class Client {
  public socket: any;
  public keyPressState: any;

  constructor(socket, keyPressState) {
    this.socket = socket;
    this.keyPressState = keyPressState;
  }
}

export default Client;
