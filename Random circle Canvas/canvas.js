var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle=' rgba(255, 0, 0, 0.7)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle='rgba(255, 255, 0, 0.3)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle='yellow';
// c.fillRect(300, 300, 100,100);

//line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle="blue";
// c.stroke();

//arc circle
// for(var i=0; i < 20; i++){
//   var x=Math.random()*window.innerWidth;
//   var y=Math.random()*window.innerHeight;
//   c.beginPath();
//   c.strokeStyle="blue";
//   c.fillStyle="green";
//   c.arc(x, y,10, Math.PI*2, false);
//   c.fill();
//   c.strokeStyle="yellow";
//   c.stroke();
// }

// c.arc(100, 300,100, Math.PI*2, false);
//   c.strokeStyle="yellow";
//   c.stroke();

// create js object for multiple circles

var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;
//var minRadius=4;

var colorArray = [
    '#0A3A82', '#87C9FB', '#F55B59', '#F71312', '#000000', '#18CDCA'
]
var textArray = [
    '#0A3A82', '#87C9FB', '#F55B59', '#F71312', '#000000', '#18CDCA'
]

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    })

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.text= textArray[Math.floor(Math.random() * textArray.length)];
    this.draw = function () {

        c.beginPath();
        c.strokeStyle = "black";
        c.font = "20px Georgia";
        c.lineWidth = 10;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        // c.beginPath();
        // c.fillStyle = this.color;
        // c.fillText(this.text, this.x,this.y);
        // c.fill();
    }


    // to animate all circles
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = - this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = - this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interActivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {

            if (this.radius < maxRadius) {
            this.radius += 1;
            }
        }

        else if (this.radius > this.minRadius) {
            this.radius -= 1;

        }
        this.draw();
    }
}

var circleArray = [];


function init() {
    circleArray = [];
    for (var i = 0; i < 100; i++) {
        var radius = Math.random() * 5 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        // x and y velocity to bounce
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}

function animate() {
    // call animate function randomly
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();