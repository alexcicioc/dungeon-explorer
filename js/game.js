const api = "https://api.myjson.com/bins/umvwm";

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
      initSprites(response.sprites);
      dialogSequence = new DialogSequence(response.dialogs);
    }
  });
};

const initSprites = sprites => {
  sprites.forEach(spriteInfo => {
    const sprite = SpriteFactory.createSpriteByType(
      spriteInfo.type,
      spriteInfo.position,
      spriteInfo.id
    );
    map.placeSprite(sprite);
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
    Adventurer.getInstance().move(left, top, updateCoordinates);
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
