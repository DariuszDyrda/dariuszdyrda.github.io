let soundsTitles = ['bubbles.mp3', 'clay.mp3', 'confetti.mp3', 'corona.mp3', 'dotted-spiral.mp3', 'flash-1.mp3',
    'flash-2.mp3', 'flash-3.mp3', 'glimmer.mp3', 'moon.mp3', 'pinwheel.mp3', 'piston-1.mp3',
    'piston-2.mp3', 'piston-3.mp3', 'prism-1.mp3', 'prism-2.mp3', 'prism-3.mp3', 'splits.mp3',
    'squiggle.mp3', 'strike.mp3', 'suspension.mp3', 'timer.mp3', 'ufo.mp3', 'veil.mp3', 'wipe.mp3',
    'zig-zag.mp3'];
let soundsArray = [];
soundsTitles.forEach(element => {
    let sound = new Howl({
        src: ['assets/sounds/' + element]
    });
    soundsArray.push(sound);
});
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");


paper.install(window);
window.onload = function () {
    paper.setup(canvas);
    ctx.font = "60px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Type any character key", canvas.width/2, canvas.height/2);
    keyListener(canvas);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setKeyMatchedColor(key) {
    return `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)}, ${key})`;
}

function randomCircle(canvas, key) {
    let randomRadius = getRandomIntInclusive(70, 120);
    let randomX = getRandomIntInclusive(randomRadius, canvas.scrollWidth - randomRadius);
    let randomY = getRandomIntInclusive(randomRadius, canvas.scrollHeight - randomRadius);
    let point = new Point(randomX, randomY);
    let circle = new Path.Circle(point, randomRadius);
    circle.fillColor = setKeyMatchedColor(86);
    return circle;
}

function keyListener(canvas) {
    document.addEventListener('keypress', function (e) {
        let code = e.keyCode;
        if(code > 96 && code < 123) {
            code -=32;
        }
        if(code > 64 && code < 91){
            
            let circle = randomCircle(canvas, e.keyCode);
            soundsArray[code-65].play();
            circle.onFrame = function (ev) {
                if (ev.time > 0.8) {
                    circle.fillColor = setKeyMatchedColor(e.keyCode);
                }
                circle.scale(0.97);

            }
        }
    });
}