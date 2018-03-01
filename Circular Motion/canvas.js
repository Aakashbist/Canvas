var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}
//var maxRadius = 40;
//var minRadius=4;

var color = [
    '#0A3A82', '#87C9FB', '#F55B59'//, '#F71312', '#000000'
]
// utility functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(color) {
    return color[Math.floor(Math.random() * color.length)];
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    })

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

//objecys/particles
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.08;
    this.distanceFromCenter = randomIntFromRange(50, 120);
    this.lastMousePosition = { x: x, y: y };

    // to animate all circles

    this.update = function () {

        var lastpoint = { x: this.x, y: this.y };

        this.radians += this.velocity;
        // to create drag effect
        this.lastMousePosition.x += (mouse.x - this.lastMousePosition.x) * 0.05;
        this.lastMousePosition.y += (mouse.y - this.lastMousePosition.y) * 0.05;


        //circular motion when multiply by certain value other wise when cos sidewise and when sin give diagonal
        this.x = this.lastMousePosition.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMousePosition.y + Math.sin(this.radians) * this.distanceFromCenter;
        // move points over time

        this.draw(lastpoint);
    }
    this.draw = function (lastpoint) {
        c.beginPath();
        c.strokeStyle = this.color;
        // c.lineWidth=3;
        c.lineWidth = this.radius;
        c.moveTo(lastpoint.x, lastpoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();

    };
}



var particles;
function init() {
    particles = [];

    for (var i = 0; i < 100; i++) {
        var radius = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, this.radius, randomColor(color)));
        // console.log(particles);
    }
}


function animate() {

    // call animate function randomly
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255,255,255,0.08)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
    }

    //foreach
    // particles.forEach(particle => { particle.update() });
}
init();

animate();