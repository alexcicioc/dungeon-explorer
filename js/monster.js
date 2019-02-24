class Monster extends Sprite {
  constructor(row, column, element, type) {
    super(row, column, element, type);
  }

  static createMonster(type, row, column, elementId) {
    this.position = { row, column };
    const monsterDiv = $("<div></div>");
    monsterDiv.attr("id", elementId);
    monsterDiv.addClass(type);
    monsterDiv.addClass("sprite");
    return new Monster(row, column, monsterDiv, type);
  }
}
