const api = 'https://api.myjson.com/bins/gfi3u';

let animationLock = false;

init();

function init() {
    $.ajax({
        async: false,
        type: 'GET',
        url: api,
        success: function (mapJson) {
            renderMap(mapJson)
        }
    });
}

function renderMap(mapJson) {
    renderTiles(mapJson);
}

function renderTiles(mapJson) {
    mapJson.forEach(function (rowJson) {
        let rowElement = $('<div></div>');
        rowElement.addClass('map-row');

        rowJson.forEach(function (tileJson) {
            let tileElement = $('<div></div>');
            tileElement.addClass('tile');
            tileElement.addClass(tileJson);
            rowElement.append(tileElement);
        });

        $('#map').append(rowElement);
    });
}

$(document).keydown(function (event) {
    if (animationLock) {
        return;
    }
    switch (event.which) {
        case 37:
            //left
            return go({left: '-=32'});

        case 38:
            // up
            return go({top: '-=32'});

        case 39:
            //right
            return go({left: '+=32'});

        case 40:
            //down
            return go({top: '+=32'});

        default:
            return; // exit this handler for other keys
    }
});

function go(direction) {
    animationLock = true;

    $('#adventurer').animate(direction, 500, function () {
        animationLock = false;
    });
}
