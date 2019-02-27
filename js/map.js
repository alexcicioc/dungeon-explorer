class Map {
  constructor(size, content) {
    this.size = size;
    this.content = content;
    this.tiles = [];
    this.sprites = [];
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

  placeAdventurer(adventurer) {
    $("body").append(adventurer.element);
    adventurer.element.css({
      left: config.leftOffset + config.tileSize * adventurer.position.column,
      top: config.topOffset + config.tileSize * adventurer.position.row
    });
    map.changeFog(adventurer.position.row, adventurer.position.column);
  }

  placeSprite(sprite) {
    const { row, column } = sprite.position;
    if (sprite instanceof Adventurer) {
      this.placeAdventurer(sprite)
    } else {
      this.tiles[row][column].append(sprite.element);
    }
    this.sprites[sprite.element.attr('id')] = sprite;
  }
}
