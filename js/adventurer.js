class Adventurer {
  constructor(startX, startY) {
    this.position = { row: 0, column: 0 };
    this.movementLock = false;
    this.changeCoordinates(startX, startY);
    this.moveToEntrance();
  }

  changeCoordinates(row, column) {
    this.position = { row, column };
    $("#positionX").html(row + 1);
    $("#positionY").html(column + 1);
  }

  moveToEntrance() {
    $("#adventurer").css({
      left: config.leftOffset + config.tileSize * this.position.column,
      top: config.topOffset + config.tileSize * this.position.row
    });
    map.changeFog(this.position.row, this.position.column);
  }

  isMovementAllowed(left, top) {
    const [sizeX, sizeY] = map.size;
    const {column, row} = this.position;

    if (this.movementLock) {
      return false;
    }

    if (left < 0 && column <= 0) {
      return false;
    }

    if (left > 0 && column + left >= sizeX) {
      return false;
    }

    if (top < 0 && row <= 0) {
      return false;
    }

    if (top > 0 && row + top >= sizeY) {
      return false;
    }

    return true;
  }

  move(left, top) {
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
    let animation = 'adventurer-move-right';

    if (left < 0) {
      animation = 'adventurer-move-left';
    }

    $("#adventurer").css({
      "animation-name": animation,
      "animation-duration": "0.5s"
    });
    $("#adventurer").animate(direction, 1000, () => {
      this.movementLock = false;
      this.changeCoordinates(row, column);
      $("#adventurer").css({
        "animation-name": "adventurer",
        "animation-duration": "0.8s"
      });
    });
  }
}
