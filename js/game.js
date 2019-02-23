const api = "https://api.myjson.com/bins/ppady";

let adventurer;
let map;
let dialogSequence;

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
      map.placeMonster(Monster.createMonster("minotaur", 2, 6));
      dialogSequence = new DialogSequence(
        response.start[0],
        response.start[1],
        ["Yeah, pretty sure I'm lost...", "I should find another exit"]
      );
    }
  });
};

initScenario();

const writeToLog = message => {
  $("#gameLog")
    .fadeOut()
    .html(message)
    .fadeIn();
};

const moveAdventurer = (left, top) => {
  if (!dialogSequence.isDialogInProgress()) {
    adventurer.move(left, top, updateCoordinates);
  } else {
    writeToLog("Place space bar to continue");
  }
};

$(document).keydown(event => {
  switch (event.which) {
    case 32:
      // space
      if (dialogSequence) {
        dialogSequence.showNext();
      }
      break;
    case 37:
      // left
      moveAdventurer(-1, 0);
      break;
    case 39:
      // right
      moveAdventurer(1, 0);
      break;
    case 38:
      // up
      moveAdventurer(0, -1);
      break;
    case 40:
      // down
      moveAdventurer(0, 1);
      break;
    default:
    // exit this handler for other keys
  }
});
