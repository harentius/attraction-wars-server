import RotationData from '../third/RotationData';

class GravityAssistData extends RotationData {
  public readonly otherPlayerId: string;
  public xIn: number;
  public yIn: number;
  public angle: number;

  constructor(otherPlayerId: string, x, y, r, direction, xIn, yIn) {
    super(otherPlayerId, x, y, r, direction);
    this.xIn = xIn;
    this.yIn = yIn;
    this.angle = 0;
  }
}

export default GravityAssistData;
