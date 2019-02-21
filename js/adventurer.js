class Adventurer {
  constructor(startX, startY) {
    this.position = { row: 0, column: 0 };
    this.tileSize = 32;
    this.movementLock = false;
    this.changeCoordinates(startX, startY);
    this.moveToEntrance();
  }

  changeCoordinates(row, column) {
    this.position = { row, column };
    map.changeFog(row, column);
    $("#positionX").html(row + 1);
    $("#positionY").html(column + 1);
  }

  moveToEntrance() {
    $("#adventurer").css({
      left: 18 + this.tileSize * this.position.column,
      top: 60 + this.tileSize * this.position.row
    });
  }

  isMovementAllowed(left, top) {
    const [sizeX, sizeY] = map.size;

    if (this.movementLock) {
      return false;
    }

    if (left < 0 && adventurer.position.column <= 0) {
      return false;
    }

    if (left > 0 && adventurer.position.column + left >= sizeX) {
      return false;
    }

    if (top < 0 && adventurer.position.row <= 0) {
      return false;
    }

    if (top > 0 && adventurer.position.row + top >= sizeY) {
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
      left: `+=${this.tileSize * left}`,
      top: `+=${this.tileSize * top}`
    };

    $("#adventurer").animate(direction, 500, () => {
      this.movementLock = false;
      this.changeCoordinates(
        this.position.row + top,
        this.position.column + left
      );
    });
  }
}
