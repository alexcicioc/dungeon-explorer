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
      adventurer = new Adventurer(response.start[0], response.start[1]);
      map = new Map(response.mapSize, response.map);
    }
  });
};

initScenario();

$(document).keydown(event => {
  if (adventurer.movementLocked) {
    return;
  }
  switch (event.which) {
    case 37:
      // left
      map.move(-1, 0);
      break;
    case 39:
      // right
      map.move(1, 0);
      break;
    case 38:
      // up
      map.move(0, -1);
      break;
    case 40:
      // down
      map.move(0, 1);
      break;
    default:
    // exit this handler for other keys
  }
});
