class Adventurer extends Sprite {
  constructor(row, column, element, baseStats) {
    super(row, column, element, "hero", baseStats);
    this.movementLock = false;
    this.moveToEntrance();
    Adventurer._instance = this;
  }

  isMovementAllowed(left, top) {
    const { column, row } = this.position;

    if (this.movementLock) {
      return false;
    }

    if (left < 0 && column <= 0) {
      return false;
    }

    if (left > 0 && column + left >= map.size.columns) {
      return false;
    }

    if (top < 0 && row <= 0) {
      return false;
    }

    if (top > 0 && row + top >= map.size.rows) {
      return false;
    }

    return true;
  }

  moveToEntrance() {
    this.element.css({
      left: config.leftOffset + config.tileSize * this.position.column,
      top: config.topOffset + config.tileSize * this.position.row
    });
    map.changeFog(this.position.row, this.position.column);
  }

  move(left, top, callback) {
    if (!this.isMovementAllowed(left, top)) {
      return false;
    }
    this.movementLock = true;

    const direction = {
      left: `+=${config.tileSize * left}`,
      top: `+=${config.tileSize * top}`
    };

    const row = this.position.row + top;
    const column = this.position.column + left;

    map.changeFog(row, column);
    const animationName =
      left >= 0 ? "adventurer-move-right" : "adventurer-move-left";

    this.element.css({
      "animation-name": animationName,
      "animation-duration": "0.5s"
    });

    this.element.animate(direction, 1000, () => {
      this.movementLock = false;
      this.position = { row, column };
      this.element.css({
        "animation-name": "adventurer",
        "animation-duration": "0.8s"
      });
      if (callback) {
        callback(row, column);
      }
    });
  }
}
