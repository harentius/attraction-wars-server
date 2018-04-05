const getValueNotViolatingBounds = (v, min, max) => Math.max(Math.min(v, max), min);

const generateRandomColor = () => +(Math.random() * 16777215);

module.exports = { getValueNotViolatingBounds, generateRandomColor };
