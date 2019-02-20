const api = 'https://api.myjson.com/bins/gfi3u';
let grid = [];
let animationLock = false;

function renderTiles(mapJson) {
  mapJson.forEach((rowJson, rowIndex) => {
    const rowElement = $('<div></div>');
    rowElement.addClass('map-row');

    rowJson.forEach((tileJson, columnIndex) => {
      const tileElement = $('<div></div>');
      tileElement.addClass('tile');
      tileElement.addClass(tileJson);
      tileElement.attr('data-x', rowIndex);
      tileElement.attr('data-y', columnIndex);
      rowElement.append(tileElement);
    });

    $('.map-content').append(rowElement);
  });
}
function renderMap(mapJson) {
  renderTiles(mapJson);
}

function initMap() {
  $.ajax({
    async: false,
    type: 'GET',
    url: api,
    success(mapJson) {
      renderMap(mapJson);
      grid = mapJson;
    }
  });
}

function initAdventurer() {

}

initMap();


function go(direction) {
  animationLock = true;

  $('#adventurer').animate(direction, 500, () => {
    animationLock = false;
  });
}


$(document).keydown((event) => {
  if (animationLock) {
    return;
  }
  switch (event.which) {
    case 37:
      // left
      go({ left: '-=32' });
      break;
    case 38:
      // up
      go({ top: '-=32' });
      break;
    case 39:
      // right
      go({ left: '+=32' });
      break;
    case 40:
      // down
      go({ top: '+=32' });
      break;
    default:
      // exit this handler for other keys
  }
});
