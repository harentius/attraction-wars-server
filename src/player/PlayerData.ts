import { generateRandomColor, genId } from '../utils';
import AttractionData from './physics/movement-handler/interaction-zone/first/AttractionData';
import RotationData from './physics/movement-handler/interaction-zone/third/RotationData';
import GravityAssistData from './physics/movement-handler/interaction-zone/second/GravityAssistData';

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

export default PlayerData;
