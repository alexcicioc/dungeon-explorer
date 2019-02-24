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

  static getInstance(row, column, elementId) {
    if (this._instance) {
      return this._instance;
    }

    return new this(row, column, elementId);
  }
}

class Monster extends Sprite {
  constructor(row, column, element, type) {
    super(row, column, element, type);
  }
}

class Vilain extends Monster {
  constructor(row, column, element) {
    super(row, column, element, "vilain");
    Vilain._instance = this;
  }
}

class SpriteFactory {
  static createSpriteByType(type, position, elementId) {
    const [row, column] = position;
    const element = this.createElement(type, elementId);
    switch (type) {
      case constants.spriteTypes.HERO:
        return new Adventurer(row, column, element);
      case constants.spriteTypes.VILAIN:
        return new Vilain(row, column, element);
      case constants.spriteTypes.BAT:
        return new Monster(row, column, element);
    }
  }

  static createElement(type, elementId) {
    return $("<div></div>")
      .attr("id", elementId)
      .addClass("sprite")
      .addClass(type);
  }
}
