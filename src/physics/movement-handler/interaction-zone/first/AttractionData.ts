import PointInterface from '../../../PointInterface';
import OtherPlayerIdAwareInterface from '../OtherPlayerIdAwareInterface';

class AttractionData implements PointInterface, OtherPlayerIdAwareInterface {
  public readonly otherPlayerId: string;
  public x: number;
  public y: number;

  public constructor(otherPlayerId: string, x, y) {
    this.otherPlayerId = otherPlayerId;
    this.x = x;
    this.y = y;
  }
}

export default AttractionData;
