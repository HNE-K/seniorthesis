// must define variables before loading page
var dragobj = null;
var art1 = null;
var art2 = null;
var art3 = null;
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
        case 65: // 37 is Left, 65 is A
            oLeft -= speed;
            break;
        case 87: // 38 is Up, 87 is W
            oTop -= speed;
            break;
        case 68: // 39 is Right, 58 is D
            oLeft += speed;
            break;
        case 83: // 40 is Down, 83 is S
            oTop += speed;
            break;
        default:
            break;
    }

    if (Math.abs(oLeft - art1.offsetLeft) <= 50 && Math.abs(oTop - art1.offsetTop) <= 50) {
        console.log("reached range");
        document.getElementById("art1Preview").style.visibility = "visible";
    } else {
        document.getElementById("art1Preview").style.visibility = "hidden";
    }
    
    if (Math.abs(oLeft - art2.offsetLeft) <= 50 && Math.abs(oTop - art2.offsetTop) <= 50) {
        console.log("reached range");
        document.getElementById("art2Preview").style.visibility = "visible";
    } else {
        document.getElementById("art2Preview").style.visibility = "hidden";
    }

    if (Math.abs(oLeft - art3.offsetLeft) <= 50 && Math.abs(oTop - art3.offsetTop) <= 50) {
        console.log("reached range");
        document.getElementById("art3Preview").style.visibility = "visible";
    } else {
        document.getElementById("art3Preview").style.visibility = "hidden";
    }
}

function init() {
    dragobj = document.getElementById("obj1");
    art1 = document.getElementById("art1");
    art2 = document.getElementById("art2");
    art3 = document.getElementById("art3");
    document.onkeydown = startMove;
    document.onkeypress = moving;
    document.onkeydown = moving;
    slider = document.getElementById("myRange");
}
window.onload = init;