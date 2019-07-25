import CircleInterface from '../physics/CircleInterface';
import { generateRandomColor } from '../utils';

class AsteroidData implements CircleInterface  {
  public readonly id: string;
  public readonly x: number;
  public readonly y: number;
  public readonly r: number;
  // Internal color list item number
  public readonly color: number;

  constructor(id: string, x: number, y: number, r: number, color: number = generateRandomColor()) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
}

export default AsteroidData;
