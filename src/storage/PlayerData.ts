import { generateRandomColor, genId } from '../utils';
import AttractionData from '../physics/movement-handler/interaction-zone/first/AttractionData';
import RotationData from '../physics/movement-handler/interaction-zone/third/RotationData';
import GravityAssistData from '../physics/movement-handler/interaction-zone/second/GravityAssistData';
import CircleInterface from '../physics/CircleInterface';

class PlayerData implements CircleInterface {
  public readonly username: string;
  public readonly id: string;
  public x: number;
  public y: number;
  public r: number;
  public vX: number;
  public vY: number;
  public bonusVx: number;
  public bonusVy: number;
  public reactiveVx: number;
  public reactiveVy: number;
  public aX: number;
  public aY: number;
  // Internal color list item number
  public color: number;
  public isAttenuationX: boolean;
  public isAttenuationY: boolean;
  public attractionData: Map<string, AttractionData>;
  public rotationData: Map<string, RotationData>;
  public gravityAssistData: Map<string, GravityAssistData>;
  public boundedToPlayersData: Map<string, PlayerData>;
  public score: number;
  public isCanPerformGravityAssist: boolean;
  public isAccelerating: boolean;

  constructor(username: string, x, y, r, id = genId(), color: number = generateRandomColor()) {
    this.username = username;
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.vX = 0;
    this.vY = 0;
    this.bonusVx = 0;
    this.bonusVy = 0;
    this.reactiveVx = 0;
    this.reactiveVy = 0;
    this.aX = 0;
    this.aY = 0;
    this.isAttenuationX = false;
    this.isAttenuationY = false;
    this.isAccelerating = false;
    this.attractionData = new Map();
    this.rotationData = new Map();
    this.gravityAssistData = new Map();
    this.boundedToPlayersData = new Map();
    this.color = color;
    this.score = 0;
    this.isCanPerformGravityAssist = true;
  }
}

export default PlayerData;
