class Map {
  constructor(size, content) {
    this.size = size;
    this.content = content;
    this.tiles = [];
    this.buildMap();
  }

  buildMap() {
    this.content.forEach((row, rowIndex) => {
      const rowElement = $("<div></div>");
      rowElement.addClass("map-row");
      this.tiles[rowIndex] = [];

      row.forEach((tile, columnIndex) => {
        const tileElement = $("<div></div>");
        tileElement.addClass("tile");
        tileElement.addClass(tile);
        rowElement.append(tileElement);
        this.tiles[rowIndex][columnIndex] = tileElement;
      });

      $(".map-content").append(rowElement);
    });
  }

  isMovementAllowed(left, top) {
    if (adventurer.movementLock) {
      return false;
    }
    const [sizeX, sizeY] = this.size;

    if (left < 0 && adventurer.y <= 0) {
      return false;
    }

    if (left > 0 && adventurer.y + left >= sizeX) {
      return false;
    }

    if (top < 0 && adventurer.x <= 0) {
      return false;
    }
    console.log(sizeY);
    if (top > 0 && adventurer.x + top >= sizeY) {
      return false;
    }

    return true;
  }

  move(left, top) {
    if (this.isMovementAllowed(left, top)) {
      adventurer.move(left, top);
    }
  }
}
