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
    const [sizeX, sizeY] = this.size;

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

  changeFog(row, column) {
    this.tiles.forEach((tileRow, tileRowIndex) => {
      tileRow.forEach((tile, tileColumnIndex) => {
        const distance =
          Math.abs(tileRowIndex - row) + Math.abs(tileColumnIndex - column);
        const opacity = 1 - distance * 0.3;
        tile.css({ opacity });
      });
    });
  }
}
