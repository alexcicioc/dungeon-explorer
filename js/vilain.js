class Vilain extends Monster {
  constructor(row, column, elementId) {
    const element = Vilain.createElement(row, column, elementId);
    super(row, column, element, "vilain");
    Vilain._instance = this;
  }

  static getInstance(row, column, elementId) {
    if (Vilain._instance) {
      return Vilain._instance;
    }

    return new Vilain(row, column, elementId);
  }

  static createElement(row, column, elementId) {
    this.position = { row, column };
    const monsterDiv = $("<div></div>");
    monsterDiv.attr("id", elementId);
    monsterDiv.addClass("minotaur");
    monsterDiv.addClass("sprite");
    return monsterDiv;
  }
}
