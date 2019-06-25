import PointInterface from '../../../PointInterface';

class AttractionData implements PointInterface {
  public x: number;
  public y: number;

  public constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default AttractionData;
