class AsteroidData {
  public readonly id: string;
  public readonly x: number;
  public readonly y: number;
  public readonly r: number;

  constructor(id: string, x: number, y: number, r: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
  }
}

export default AsteroidData;
