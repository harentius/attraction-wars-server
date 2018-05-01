const getValueNotViolatingBounds = (v: number, min: number, max: number): number => Math.max(Math.min(v, max), min);

const generateRandomColor = (): number => Math.trunc(Math.random() * 16777215);

const genId = (): string => Math.random().toString(36).substr(2, 16);

export { getValueNotViolatingBounds, generateRandomColor, genId };
