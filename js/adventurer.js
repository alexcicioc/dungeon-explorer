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

  move(left, top) {
    if (this.movementLock || !map.isMovementAllowed(left, top)) {
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
