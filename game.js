let animationLock = false;

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
