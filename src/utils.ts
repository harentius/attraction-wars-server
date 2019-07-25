const getValueNotViolatingBounds = (v: number, min: number, max: number): number => Math.max(Math.min(v, max), min);

const generateRandomColor = (max: number = 9): number => Math.trunc(Math.random() * max);

const genId = (): string => Math.random().toString(36).substr(2, 16);

const randInt = (min: number, max: number) => Math.round(Math.random() * (max - min)) + min;

export { getValueNotViolatingBounds, generateRandomColor, genId, randInt };
