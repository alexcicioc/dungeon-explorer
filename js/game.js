const api = "https://api.myjson.com/bins/ppady";

let adventurer;
let map;

const updateCoordinates = (row, column) => {
  $("#positionX").html(row + 1);
  $("#positionY").html(column + 1);
};

const initScenario = () => {
  $.ajax({
    type: "GET",
    url: api,
    success(response) {
      map = new Map(response.mapSize, response.map);
      adventurer = new Adventurer(
        response.start[0],
        response.start[1],
        $("#adventurer")
      );
      map.placeMonster(Monster.createMonster("bat", 3, 8));
      map.placeMonster(Monster.createMonster("bat", 1, 5));
      map.placeMonster(Monster.createMonster("minotaur", 0, 6));
    }
  });
};

initScenario();

$(document).keydown(event => {
  switch (event.which) {
    case 37:
      // left
      adventurer.move(-1, 0, updateCoordinates);
      break;
    case 39:
      // right
      adventurer.move(1, 0, updateCoordinates);
      break;
    case 38:
      // up
      adventurer.move(0, -1, updateCoordinates);
      break;
    case 40:
      // down
      adventurer.move(0, 1, updateCoordinates);
      break;
    default:
    // exit this handler for other keys
  }
});
