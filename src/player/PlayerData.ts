import { generateRandomColor, genId } from '../utils';

class AttractionData {
  public x: number;
  public y: number;

  public constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class RotationData {
  public x: number;
  public y: number;
  public r: number;
  public direction: number;

  constructor(x, y, r, direction) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.direction = direction;
  }
}

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

class PlayerData {
  public id: string;
  public x: number;
  public y: number;
  public r: number;
  public vX: number;
  public vY: number;
  public bonusVx: number;
  public bonusVy: number;
  public aX: number;
  public aY: number;
  public color: number;
  public attractionData: Map<string, AttractionData>;
  public rotationData: Map<string, RotationData>;
  public gravityAssistData: Map<string, GravityAssistData>;
  public boundedToPlayersData: Map<string, PlayerData>;

  constructor(x, y, r, id = genId(), color = generateRandomColor()) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.vX = 0;
    this.vY = 0;
    this.bonusVx = 0;
    this.bonusVy = 0;
    this.aX = 0;
    this.aY = 0;
    this.attractionData = new Map();
    this.rotationData = new Map();
    this.gravityAssistData = new Map();
    this.boundedToPlayersData = new Map();
    this.color = color;
  }
}

export { RotationData, PlayerData, AttractionData, GravityAssistData };
