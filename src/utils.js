const getValueNotViolatingBounds = (v, min, max) => Math.max(Math.min(v, max), min);

module.exports = { getValueNotViolatingBounds };
