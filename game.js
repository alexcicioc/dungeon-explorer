const api = 'https://api.myjson.com/bins/gfi3u';

let animationLock = false;

init();

function init(){
	fetchMap().then(function(mapJson){
		renderMap(mapJson);
	});
}

function fetchMap(){
	return new Promise(function(resolve, reject){
		$.get('https://api.myjson.com/bins/gfi3u', function(mapJson){
			resolve(mapJson);
		})
		.fail(function(){
			reject();
		});
	});
}

function renderMap(mapJson){
	renderTopWall();
	renderTiles(mapJson);
	renderBottomWall();
}

function renderTiles(mapJson){
	mapJson.forEach(function(rowJson){
		let rowElement = $('<div></div>');
		rowElement.addClass('map-row');
		
		rowJson.forEach(function(tileJson){
			let tileElement = $('<div></div>');
			tileElement.addClass('tile');
			tileElement.addClass(tileJson);
			rowElement.append(tileElement);
		});
		
		$('#map').append(rowElement);
	});
	
}

function renderTopWall(){
	let topWallElement = $('<div></div>');
	topWallElement.addClass('wall-top');
	
	let entranceElement = $('<div></div>');
	entranceElement.addClass('entrance');
	topWallElement.append(entranceElement);
	
	$('#map').append(topWallElement);
}

function renderBottomWall(){
	let bottomWallElement = $('<div></div>');
	bottomWallElement.addClass('wall-bottom');
	
	$('#map').append(bottomWallElement);
}

$(document).keydown(function (event) {
    if (animationLock) {
        return;
    }
    switch (event.which) {
        case 37:
            //left
            return go({ left: '-=32' });

        case 38:
            // up
            return go({ top: '-=32' });

        case 39:
            //right
            return go({ left: '+=32' });

        case 40:
            //down
            return go({ top: '+=32' });

        default: return; // exit this handler for other keys
    }
});

function go(direction) {
    animationLock = true;
    // TODO change adventurer default css animation to a move animation
    $('#adventurer').animate(direction, 500, function () {
        animationLock = false;
    });
}
