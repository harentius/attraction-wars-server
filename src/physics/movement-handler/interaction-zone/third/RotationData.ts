import OtherPlayerIdAwareInterface from '../OtherPlayerIdAwareInterface';

class RotationData implements OtherPlayerIdAwareInterface {
  public readonly otherPlayerId: string;
  public x: number;
  public y: number;
  public r: number;
  public direction: number;

  constructor(otherPlayerId: string, x, y, r, direction) {
    this.otherPlayerId = otherPlayerId;
    this.x = x;
    this.y = y;
    this.r = r;
    this.direction = direction;
  }
}

export default RotationData;
