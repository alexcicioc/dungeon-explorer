class Sprite {
  constructor(row, column, element, type, stats) {
    this.position = { row, column };
    this.element = element;
    this.type = type;
    this.stats = stats;
  }

  static get instance() {
    return this.hasOwnProperty("_instance") ? this._instance : null;
  }

  static set instance(value) {
    this._instance = value;
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    throw new Error('No instance found');
  }
}

class Monster extends Sprite {
  constructor(row, column, element, type, baseStats) {
    super(row, column, element, type, baseStats);
  }
}

class Vilain extends Monster {
  constructor(row, column, element, baseStats) {
    super(row, column, element, "vilain", baseStats);
    Vilain._instance = this;
  }
}

class SpriteFactory {
  static createSpriteByType(type, position, elementId, baseStats) {
    const [row, column] = position;
    const element = this.createElement(type, elementId);
    switch (type) {
      case constants.spriteTypes.HERO:
        return new Adventurer(row, column, element, baseStats);
      case constants.spriteTypes.VILAIN:
        return new Vilain(row, column, element, baseStats);
      case constants.spriteTypes.BAT:
        return new Monster(row, column, element, baseStats);
      default:
        return new Sprite(row, column, element, type, baseStats);

    }
  }

  static createElement(type, elementId) {
    return $("<div></div>")
      .attr("id", elementId)
      .addClass("sprite")
      .addClass(type);
  }
}
