class Monster {
  constructor(row, column, element) {
    this.position = { row, column };
    this.element = element;
  }

  static createMonster(type, row, column) {
    this.position = { row, column };
    const monsterDiv = $('<div></div>');
    monsterDiv.addClass(type);
    monsterDiv.addClass('sprite');
    return new Monster(row, column, monsterDiv);
  }
}
