let map;
let dialogSequence;

const updateCoordinates = (row, column) => {
  $("#positionX").html(row + 1);
  $("#positionY").html(column + 1);
  dialogSequence.startDialogIfAvailable(row, column);
};

function createSprites(sprites) {
  sprites.forEach(spriteInfo => {
    const sprite = SpriteFactory.createSpriteByType(
      spriteInfo.type,
      spriteInfo.position,
      spriteInfo.id,
      spriteInfo.baseStats
    );
    map.placeSprite(sprite);
  });
}

const initMap = () => {
  $.ajax({
    type: "GET",
    url: config.api.map,
    success(response) {
      map = new Map(response.size, response.map);
      initSprites();
    }
  });
};

function initSprites() {
  $.ajax({
    type: "GET",
    url: config.api.sprites,
    success(response) {
      createSprites(response);
      initDialogs();
    }
  });
}

function initDialogs() {
  $.ajax({
    async: false,
    type: "GET",
    url: config.api.dialogs,
    success(response) {
      dialogSequence = new DialogSequence(response);
      const { row, column } = Adventurer.getInstance().position;
      updateCoordinates(row, column);
    }
  });
}

initMap();

const writeToLog = message => {
  $("#gameLog")
    .fadeOut()
    .html(message)
    .fadeIn();
};

const moveAdventurer = (left, top) => {
  if (!dialogSequence.isDialogInProgress()) {
    const adventurer = Adventurer.getInstance();
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
