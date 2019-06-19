import RotationData from '../third/RotationData';

class GravityAssistData extends RotationData {
  public xIn: number;
  public yIn: number;
  public angle: number;

  constructor(x, y, r, direction, xIn, yIn) {
    super(x, y, r, direction);
    this.xIn = xIn;
    this.yIn = yIn;
    this.angle = 0;
  }
}

export default GravityAssistData;
