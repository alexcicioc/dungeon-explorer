class Adventurer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.tileSize = 32;
    this.movementLock = false;
    this.moveToEntrance();
  }

  moveToEntrance() {
    $("#adventurer").css({
      left: 18 + this.tileSize * this.y,
      top: 48 + this.tileSize * this.x
    });
  }

  move(left, top) {
    this.movementLock = true;

    const direction = {
      left: `+=${this.tileSize * left}`,
      top: `+=${this.tileSize * top}`
    };

    $("#adventurer").animate(direction, 500, () => {
      this.movementLock = false;
      this.x += top;
      this.y += left;
    });
  }
}
