const AVERAGE_PERCENT_CALCULATION_PERIOD = 1000;

class ServerStatistics {
  public loadPercent: number;
  public maxLoadPercent: number;
  public averageLoadPercent: number;
  private readonly loadPercentHistory: number[];
  private loadPercentHistoryIndex: number;

  constructor() {
    this.loadPercent = 0.0;
    this.maxLoadPercent = 0.0;
    this.averageLoadPercent = 0.0;
    this.loadPercentHistory = [].fill(0, 0, AVERAGE_PERCENT_CALCULATION_PERIOD);
    this.loadPercentHistoryIndex = 0;
  }

  public setLoadPercent(loadPercent: number): void {
    this.loadPercent = this.roundValue(loadPercent);

    if (this.loadPercent > this.maxLoadPercent) {
      this.maxLoadPercent = this.loadPercent;
    }

    if (this.loadPercentHistoryIndex === AVERAGE_PERCENT_CALCULATION_PERIOD) {
      this.loadPercentHistoryIndex = 0;
    }

    this.loadPercentHistory[this.loadPercentHistoryIndex] = loadPercent;
    this.loadPercentHistoryIndex++;

    this.averageLoadPercent = this.roundValue(
      this.loadPercentHistory.reduce((a, b) => a + b, 0) / this.loadPercentHistory.length,
    );
  }

  public toJSON(): object {
    return {
      loadPercent: this.loadPercent,
      maxLoadPercent: this.maxLoadPercent,
      averageLoadPercent: this.averageLoadPercent,
    };
  }

  private roundValue(value: number): number {
    return Math.round(value * 100) / 100;
  }
}

export default ServerStatistics;
