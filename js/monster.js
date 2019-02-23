class Monster extends Sprite {
  constructor(row, column, element) {
    super(row, column, element);
  }

  static createMonster(type, row, column) {
    this.position = { row, column };
    const monsterDiv = $("<div></div>");
    monsterDiv.addClass(type);
    monsterDiv.addClass("sprite");
    return new Monster(row, column, monsterDiv);
  }
}
