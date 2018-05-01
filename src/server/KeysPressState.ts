class KeysPressState {
  public up: boolean;
  public down: boolean;
  public left: boolean;
  public right: boolean;

  constructor({ up = false, down = false, left = false, right = false } = {}) {
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
  }

  public isEqual(keysPressState) {
    for (const [key, value] of (Object as any).entries(this)) {
      if (value !== keysPressState[key]) {
        return false;
      }
    }

    return true;
  }

  public isAnyMoveKeyPressed() {
    return this.up || this.down || this.left || this.right;
  }
}

export default KeysPressState;
