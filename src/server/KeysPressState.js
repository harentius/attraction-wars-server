class KeysPressState {
  constructor({ up = false, down = false, left = false, right = false } = {}) {
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
  }

  isEqual(keysPressState) {
    for (const [key, value] of Object.entries(this)) {
      if (value !== keysPressState[key]) {
        return false;
      }
    }

    return true;
  }

  isAnyMoveKeyPressed() {
    return this.up || this.down || this.left || this.right;
  }
}

module.exports = KeysPressState;
