class GameMechanics {

  static checkTileTriggers(row, column) {
    const tile = map.tiles[row][column];
    const spriteElement = $(tile.find('.sprite')[0]);

    if (spriteElement) {
      if (spriteElement.hasClass(constants.spriteTypes.HEALTH_POTION)) {
        this.consumeItem(spriteElement);
      } else if (spriteElement.hasClass(constants.spriteTypes.CHEST_CLOSED)) {
        this.openChest(spriteElement);
      }
    }
  }

  static consumeItem(spriteElement) {
    const adventurer = Adventurer.getInstance();
    adventurer.consume(map.sprites[spriteElement.attr('id')]);
    spriteElement.remove();
    delete map.sprites[spriteElement.attr('id')];
  }

  static openChest(spriteElement) {
    const adventurer = Adventurer.getInstance();
    adventurer.consume(map.sprites[spriteElement.attr('id')]);
    map.sprites[spriteElement.attr('id')].type = 'chest-open';
    spriteElement.removeClass('chest-closed').addClass('chest-open');
  }

  static isAttackable() {
    
  }

  static attack() {

  }
}