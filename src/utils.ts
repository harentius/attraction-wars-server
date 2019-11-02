const getValueNotViolatingBounds = (v: number, min: number, max: number): number => Math.max(Math.min(v, max), min);

const generateRandomColor = (max: number = 9): number => Math.round(Math.random() * max);

let id = 0;
const genId = (): string => `${id++}`;

const randInt = (min: number, max: number) => Math.round(Math.random() * (max - min)) + min;

const truncateFloat = (x: number) => ~~x;

export { getValueNotViolatingBounds, generateRandomColor, genId, randInt, truncateFloat };
