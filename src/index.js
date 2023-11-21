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
var isMoving = null;
var shuffledLeaves = false;
var NPCcounter = 0;
var deltaX = 0;
var deltaY = 0;
var currentSeason = "spring";

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
            isMoving = true;
            if (oLeft < 60) {
                break; // don't move out of bounds
            }
            oLeft -= speed;
            if (facingRight) {
                document.getElementById("obj1").style.transform = "scaleX(-1)"; // flip
                facingRight = false;
            }
            // 200 or less space between unicorn's left and the world (size 1000) 's left
            if (oLeft - document.getElementById("world").scrollLeft < 200) {
                // treat section as our html body
                document.getElementById("world").scrollBy(-5, 0);
            }
            break;
        case 87: // 38 is Up, 87 is W
            isMoving = true;
            if (oTop < 0) {
                break;
            }
            oTop -= speed;
            break;
        case 68: // 39 is Right, 58 is D
            isMoving = true;
            if (oLeft > 2170) {
                break;
            }
            // console.log(oLeft);
            oLeft += speed;
            if (!facingRight) {
                document.getElementById("obj1").style.transform = "scaleX(1)"; // flip again
                facingRight = true;
            }
            if (oLeft - document.getElementById("world").scrollLeft > 800) {
                // treat section as our html body
                document.getElementById("world").scrollBy(5, 0);
            }
            break;
        case 83: // 40 is Down, 83 is S
            isMoving = true;
            if (oTop > 540) {
                break;
            }
            // console.log(oTop);
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
    // upon clicking/moving the slider, this function runs.
    slider.oninput = function() {
        if (slider.value >= 1 && slider.value <= 25) {
            console.log("spring");
            currentSeason = "spring";
            document.getElementById("world").style.backgroundImage = "url(images/springtemp.jpg)";
            document.getElementById("waves1").style.display = "none";
            document.getElementById("waves2").style.display = "none";
            document.getElementById("waves3").style.display = "none";
            document.getElementById("waves4").style.display = "none";
        }
        if (slider.value >= 26 && slider.value <= 50) {
            console.log("summer");
            currentSeason = "summer";
            document.getElementById("world").style.backgroundImage = "url(images/desert.jpg)";
            document.getElementById("container").style.display = "none";
            document.getElementById("waves1").style.display = "block";
            document.getElementById("waves2").style.display = "block";
            document.getElementById("waves3").style.display = "block";
            document.getElementById("waves4").style.display = "block";
        }
        if (slider.value >= 51 && slider.value <= 75) {
            console.log("autumn");
            if (currentSeason != "autumn") {
                var leaves = document.querySelectorAll(".leaf");
                for (var j = 0; j < leaves.length; j++) {
                    leaves[j].style.top = Math.random()*window.innerHeight + "px";
                }
            }
            currentSeason = "autumn";
            document.getElementById("world").style.backgroundImage = "url(images/autumntemp.jpeg)";
            document.getElementById("sky").style.display = "none";
            document.getElementById("container").style.display = "block";
            document.getElementById("waves1").style.display = "none";
            document.getElementById("waves2").style.display = "none";
            document.getElementById("waves3").style.display = "none";
            document.getElementById("waves4").style.display = "none";
        }
        if (slider.value >= 76 && slider.value <= 100) {
            console.log("winter");
            currentSeason = "winter";
            document.getElementById("world").style.backgroundImage = "url(images/wintertemp.webp)";
            document.getElementById("sky").style.display = "block";
            document.getElementById("container").style.display = "none";
        }
    }

    const frames = document.getElementById("obj1").children;
    const frameCount = frames.length;
    let i = 0; // frame number
    isMoving = false;
    // loop through the frame's numbers. setInterval means do this stuff on loop every 100 ms = 0.1 s
    setInterval(function () { 
        if (isMoving) { // there are 15 frames for running rn
            // deactivate other sets of frames
            frames[i % 2 + 15].style.display = "none";
            // activate the running frames
            frames[i % 15].style.display = "none";
            frames[++i % 15].style.display = "block";
        }
        else { // i % 2 + 15 jumps to the 16th and 17th items
            // deactivate the running frames
            frames[i % 15].style.display = "none";
            // activate the standing frames
            frames[i % 2 + 15].style.display = "none";
            frames[++i % 2 + 15].style.display = "block";
        }
    }, 100);

    // Winter Snow animation
    //get and store canvas & context
    var canvas = document.getElementById("sky");
    var ctx    = canvas.getContext("2d");
    var h     = window.innerHeight;
    var w     = window.innerWidth;
    //set dims to window
    canvas.height = h;
    canvas.width  = w;
    // Generate snowflakes 
    var mf = 100; // max flakes
    var flakes = [];
    // loop through the empty flakes 
    for(var j = 0; j < mf; j++){
        flakes.push({
        x: Math.random()*w,
        y: Math.random()*(h/2),
        r: Math.random()*2+2, //min of 2px and max 7px
        d: Math.random() + 1  // density of flakes
        })
    }
    //draw flakes 
    function drawFlakes(){
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for(var j = 0; j < mf; j++){
        var f = flakes[j];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        moveFlakes();
    }
    //animate the flakes
    var angle = 0;
    function moveFlakes(){
        angle += 0.01;
        for(var j = 0; j < mf; j++){
        //store the current flake
        var f = flakes[j];
        //Upadte Y and X coordinate of each snow
        f.y += Math.pow(f.d, 2) + 1;
        f.x += Math.sin(angle) * 2;
        //if the snow reach to the bottom send it to the top again
        if(f.y > h){
            flakes[j] = {x: Math.random()*w, y: 0, r: f.r, d: f.d};
            }
        }
        }
    setInterval(drawFlakes, 25);

    // copy-pasted leaf animation
    var container = document.getElementById("container");
    var telaInteira = window.innerWidth;
    
    function logzin() {
        telaInteira = window.innerWidth;
    }
    
    setInterval(logzin, 1000);
    
    function createLeaf() {
        var leaf = document.createElement("div");
        leaf.innerHTML =
            '<img src="https://art.pixilart.com/sr20867d214926b.png">';
    
        leaf.classList.add("leaf");
        leaf.style.left = Math.random() * telaInteira + "px";
        container.appendChild(leaf);

        // var leaves = document.querySelectorAll(".leaf");
        // if (leaves.length == 10 && !shuffledLeaves) {
        //     shuffledLeaves = true;
        //     for (var j = 0; j < leaves.length; j++) {
        //         // leaves[j].style.left = 0;
        //         leaves[j].style.top = Math.random() * window.innerHeight + "px";
        //     }
        // }
    }
    
    setInterval(createLeaf, 100);
    // for (var j = 0; j < 100; j++) {
    //     createLeaf();
    // }
    
    var windStrength = 1;
    
    var windDirection = 1;
    
    function updateLeafPosition(leaf) {
        leaf.style.top =
            parseInt(leaf.style.top) + 1 + "px";
        leaf.style.left =
            parseInt(leaf.style.left) + windDirection * windStrength + "px";
    
        if (parseInt(leaf.style.top) > window.innerHeight) {
            leaf.remove();
        }
    }
    
    setInterval(function () {
        var leaves = document.querySelectorAll(".leaf");
        for (var i = 0; i < leaves.length; i++) {
            updateLeafPosition(leaves[i]);
        }
    }, 10);
    
    document.addEventListener("mousemove", (event) => {
        var metadeTela = window.innerWidth / 2;
        var xdomouse = event.pageX;
        if (xdomouse > metadeTela) {
            windDirection = 1;
        } else {
            windDirection = -1;
        }
    });
    
    document.addEventListener("mousemove", (event2) => {
        var metadeTela = window.innerWidth / 2;
        var xdomouse2 = event2.pageX;
        if (xdomouse2 > metadeTela && xdomouse2 < metadeTela + 300) {
            windStrength = 1;
        } else if (xdomouse2 > metadeTela + 300 && xdomouse2 < metadeTela + 600) {
            windStrength = 2;
        } else if (xdomouse2 > metadeTela + 600) {
            windStrength = 3;
        } else if (xdomouse2 < metadeTela && xdomouse2 > metadeTela - 300) {
            windStrength = 1;
        } else if (xdomouse2 < metadeTela - 300 && xdomouse2 > metadeTela - 600) {
            windStrength = 2;
        } else if (xdomouse2 < metadeTela - 600) {
            windStrength = 3;
        }
    });

    // NPC's random animations
    // Walking in random directions by adding random value to original position
    setInterval(function() {
        var npc = document.getElementById("NPC");
        var phrases = ["Hello!", "How are you?", "I'm hungry", "Where am I?"];
        if (Math.random() <= 0.01) {
            console.log("NPC says hello"); // runs 1 time per 10 secs
            var phrase = phrases[Math.floor(Math.random()*phrases.length)];
            document.getElementById("speechbubble").style.visibility = "visible";
            document.getElementById("NPCspeech").innerHTML = phrase;
            setTimeout(() => {
                document.getElementById("speechbubble").style.visibility = "hidden";
            }, 4000); // 4 seconds
        }
        if (NPCcounter == 0) {
            // can change deltaX and deltaY to a pattern for __ secs
            deltaX = Math.floor(Math.random() * 4); // *4 is for increasing speed, which is random
            deltaY = Math.floor(Math.random() * 4);
            NPCcounter = 50; // walk in same direction for 5 seconds
            // randomize direction
            if (Math.random() <= 0.5) {
                deltaX *= -1;
            }
            if (Math.random() <= 0.5) {
                deltaY *= -1;
            }
        }
        var newX = npc.offsetLeft + deltaX;
        var newY = npc.offsetTop + deltaY;
        NPCcounter -= 1;
        // limit NPC's movement to the world
        if (newX >= 0 && newY >= 0 && newY < 400 && newX < 2100) {
            document.getElementById("NPC").style.left = newX;
            document.getElementById("NPC").style.top = newY;
        }
    }, 100); // runs 10 times per second

    setInterval(function() {
        var npc = document.getElementById("NPC2img");
        if (Math.random() < 0.5) {
            npc.src = "images/NPC.gif";
        }
        else {
            npc.src = "images/NPC2.gif";
        }
    }, 1000);
}
window.onload = init;

// senses when user is not clicking the running buttons bc doing so turns isMoving into true
// keyup means when any button is released, but isMoving limits to AWSD.
document.addEventListener('keyup', (event) => {
    if (isMoving) {
        isMoving = false;
    }
  });
  