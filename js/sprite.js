class Sprite {
  constructor(row, column, element, type) {
    this.position = { row, column };
    this.element = element;
    this.type = type;
  }

  static get instance() {
    return this.hasOwnProperty("_instance") ? this._instance : void 0;
  }

  static set instance(value) {
    this._instance = value;
  }
}

class SpriteFactory {
  static createSpriteByType(type, position, elementId) {
    const [row, column] = position;
    switch (type) {
      case constants.spriteTypes.HERO:
        return new Adventurer(row, column, $(`#${elementId}`));
      case constants.spriteTypes.VILAIN:
        return new Vilain(row, column, elementId);
      case constants.spriteTypes.BAT:
        return Monster.createMonster("bat", row, column, elementId);
    }
  }
}
