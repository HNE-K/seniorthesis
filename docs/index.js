// must define variables before loading page
var dragobj = null;
var art1 = null;
var art2 = null;
var art3 = null;
var slider = null;
var oLeft = 0;
var oTop = 0;
var speed = 5;
var facingRight = null;

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
            if (facingRight) {
                document.getElementById("obj1").style.transform = "scaleX(-1)"; // flip
                facingRight = false;
            }
            break;
        case 87: // 38 is Up, 87 is W
            oTop -= speed;
            break;
        case 68: // 39 is Right, 58 is D
            oLeft += speed;
            if (!facingRight) {
                document.getElementById("obj1").style.transform = "scaleX(1)"; // flip again
                facingRight = true;
            }
            break;
        case 83: // 40 is Down, 83 is S
            oTop += speed;
            break;
        default:
            break;
    }

    if (oLeft - art1.offsetLeft >= -60 && oLeft - art1.offsetLeft <= 0 && oTop - art1.offsetTop >= -60 && oTop - art1.offsetTop <= 0) {
        document.getElementById("art1Preview").style.visibility = "visible";
    } else {
        document.getElementById("art1Preview").style.visibility = "hidden";
    }
    
    if (oLeft - art2.offsetLeft >= -60 && oLeft - art2.offsetLeft <= 0 && oTop - art2.offsetTop >= -60 && oTop - art2.offsetTop <= 0) {
        document.getElementById("art2Preview").style.visibility = "visible";
    } else {
        document.getElementById("art2Preview").style.visibility = "hidden";
    }

    if (oLeft - art3.offsetLeft >= -60 && oLeft - art3.offsetLeft <= 0 && oTop - art3.offsetTop >= -60 && oTop - art3.offsetTop <= 0) {
        document.getElementById("art3Preview").style.visibility = "visible";
    } else {
        document.getElementById("art3Preview").style.visibility = "hidden";
    }
}

function init() {
    dragobj = document.getElementById("obj1");
    facingRight = true;
    art1 = document.getElementById("art1");
    art2 = document.getElementById("art2");
    art3 = document.getElementById("art3");
    document.onkeydown = startMove;
    document.onkeypress = moving;
    document.onkeydown = moving;
    slider = document.getElementById("myRange");

    const frames = document.getElementById("obj1").children;
    const frameCount = frames.length;
    let i = 0;
    setInterval(function () { 
    frames[i % frameCount].style.display = "none";
    frames[++i % frameCount].style.display = "block";
    }, 100);
}
window.onload = init;