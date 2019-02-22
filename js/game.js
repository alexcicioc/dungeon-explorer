const api = "https://api.myjson.com/bins/ppady";

let adventurer;
let map;
let grid = [];

const initScenario = () => {
  $.ajax({
    async: false,
    type: "GET",
    url: api,
    success(response) {
      map = new Map(response.mapSize, response.map);
      adventurer = new Adventurer(response.start[0], response.start[1]);
    }
  });
};

initScenario();

$(document).keydown(event => {
  switch (event.which) {
    case 37:
      // left
      adventurer.move(-1, 0);
      break;
    case 39:
      // right
      adventurer.move(1, 0);
      break;
    case 38:
      // up
      adventurer.move(0, -1);
      break;
    case 40:
      // down
      adventurer.move(0, 1);
      break;
    default:
    // exit this handler for other keys
  }
});
