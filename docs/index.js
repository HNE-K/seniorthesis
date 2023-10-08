// must define variables before loading page
var dragobj = null;
var art1 = null;
var slider = null;
var oLeft = 0;
var oTop = 0;
var speed = 5;

function startMove() {
    if (dragobj) {
        oLeft = dragobj.offsetLeft;
        oTop = dragobj.offsetTop;
    }
}

function moving(e) {
    if (dragobj) {
        updatePos(e);
        dragobj.style.left = oLeft + 'px';
        dragobj.style.top = oTop + 'px';
    }
}

function updatePos(Ev) {
    oLeft = dragobj.offsetLeft;
    oTop = dragobj.offsetTop;
    if (!Ev) var Ev = window.event;
    var iKeyCode = Ev.keyCode;
    if (Ev.keyCode) iKeyCode = Ev.keyCode;
    else if (Ev.which) iKeyCode = Ev.which;
    switch (iKeyCode) {
        case 37:
            oLeft -= speed;
            break;
        case 38:
            oTop -= speed;
            break;
        case 39:
            oLeft += speed;
            break;
        case 40:
            oTop += speed;
            break;
        default:
            break;
    }
//     console.log(oLeft, oTop);
//     console.log(art1.offsetLeft, art1.offsetTop);
    if (Math.abs(oLeft - art1.offsetLeft) <= 50 && Math.abs(oTop - art1.offsetTop) <= 50) {
        console.log("reached range");
        window.location.href = "art1.html";
    }
}

function init() {
    dragobj = document.getElementById("obj1");
    art1 = document.getElementById("art1");
    document.onkeydown = startMove;
    document.onkeypress = moving;
    document.onkeydown = moving;
    slider = document.getElementById("myRange");
}
window.onload = init;