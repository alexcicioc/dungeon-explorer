let map;
let dialogSequence;

const updateCoordinates = (row, column) => {
  $("#positionX").html(row + 1);
  $("#positionY").html(column + 1);
  dialogSequence.startDialogIfAvailable(row, column);
  map.checkTileTriggers(row, column);
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
  const adventurer = Adventurer.getInstance();
  let nextTile = false;
  if (map.tiles[adventurer.position.row + top]) {
    nextTile = map.tiles[adventurer.position.row + top][adventurer.position.column + left];
  }
  if (!nextTile || nextTile.hasClass('tile-disabled')) {
    writeToLog("Can't go there");
  } else if (!dialogSequence.isDialogInProgress()) {
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
