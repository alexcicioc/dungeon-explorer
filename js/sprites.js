/**
 * Could be basically anything floating over a map tile
 */
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

  getId() {
    return this.element.attr('id');
  }
}

/**
 * Character is a "fightable entity"
 */
class Character extends Sprite {
  constructor(row, column, element, type, stats) {
    super(row, column, element, type, stats);
    this.updateHp();
  }

  updateHp() {
    let hpBar = $(this.element.find('.hp-bar'));
    if (hpBar.length === 0) { 
      hpBar = $("<div></div>").addClass('hp-bar');
      this.element.append(hpBar);
    }
    const percentage = this.stats.healingPoints * 100 / this.stats.vitality;
    hpBar.css({
      background: `linear-gradient(90deg, rgba(255, 0, 43, 0.5) ${percentage}%, rgba(0, 255, 255, 0) ${100 - percentage}%)`
    }).html(`${this.stats.healingPoints}/${this.stats.vitality}`);
  }

  isDead() {
    return this.stats.healingPoints <= 0;
  }
}

class Monster extends Character {
  constructor(row, column, element, type, stats) {
    super(row, column, element, type, stats);
  }
}

class Vilain extends Character {
  constructor(row, column, element, stats) {
    super(row, column, element, "vilain", stats);
    Vilain._instance = this;
  }
}

class Adventurer extends Character {
  constructor(row, column, element, stats) {
    super(row, column, element, "hero", stats);
    this.movementLock = false;
    Adventurer._instance = this;
  }

  moveToEntrance() {
    this.element.css({
      left: config.leftOffset + config.tileSize * this.position.column,
      top: config.topOffset + config.tileSize * this.position.row
    });
    map.changeFog(this.position.row, this.position.column);
  }

  move(left, top, callback) {
    if (this.movementLock) {
      return false;
    }
    this.movementLock = true;

    const direction = {
      left: `+=${config.tileSize * left}`,
      top: `+=${config.tileSize * top}`
    };

    const row = this.position.row + top;
    const column = this.position.column + left;

    map.changeFog(row, column);
    const animationName =
      left >= 0 ? "adventurer-move-right" : "adventurer-move-left";

    this.element.css({
      "animation-name": animationName,
      "animation-duration": "0.5s"
    });

    this.element.animate(direction, 1000, () => {
      this.movementLock = false;
      this.position = { row, column };
      this.element.css({
        "animation-name": "adventurer",
        "animation-duration": "0.8s"
      });
      if (callback) {
        callback();
      }
    });
  }

  consume(sprite) {
    for (let property in sprite.stats) {
      this.stats[property] += sprite.stats[property];
    }

    this.updateHp();
  }
}

class SpriteFactory {
  static createSpriteByType(type, position, elementId, stats) {
    const [row, column] = position;
    const element = this.createElement(type, elementId);
    switch (type) {
      case constants.spriteTypes.HERO:
        return new Adventurer(row, column, element, stats);
      case constants.spriteTypes.VILAIN:
        return new Vilain(row, column, element, stats);
      case constants.spriteTypes.BAT:
        return new Monster(row, column, element,type, stats);
      default:
        return new Sprite(row, column, element, type, stats);
    }
  }

  static createElement(type, elementId) {
    return $("<div></div>")
      .attr("id", elementId)
      .addClass("sprite")
      .addClass(type);
  }
}
