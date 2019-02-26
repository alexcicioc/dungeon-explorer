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

  placeSprite(sprite) {
    const { row, column } = sprite.position;
    if (sprite.type === constants.spriteTypes.HERO) {
      $("body").append(sprite.element);
    } else {
      this.tiles[row][column].append(sprite.element);
    }
    this.sprites[sprite.element.attr('id')] = sprite;
  }

  checkTileTriggers(row, column) {
    this.tiles[row][column].find('.sprite').each((index, element) => {
      const sprite = $(element);
      if (sprite.hasClass(constants.spriteTypes.HEALTH_POTION)) {
        Adventurer.getInstance().consume(this.sprites[sprite.attr('id')]);
      }
    })
  }
}
