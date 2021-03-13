
var canvas = document.querySelector("canvas");
var windowWidth = 0
var windowHeight = 0

function updateWindowSize(){
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

updateWindowSize()
window.addEventListener("resize", function(event){
    updateWindowSize()
});

var strokeWidth = 20
var squaresNumber = 50
var distance = 50

var c = canvas.getContext("2d");

function Square(radius){
    this.strokeWidth = distance/this.radius
    this.radius = radius
    this.draw = function(){
        c.lineWidth = this.strokeWidth;
        c.beginPath()
        c.strokeStyle = "white"
        c.rect(this.x, this.y, this.radius * 2, this.radius * 2)
        c.stroke()
    }
    this.update = function(){
        this.strokeWidth = this.radius * 0.025
        this.x = (windowWidth * 0.5) - (this.radius)
        this.y = (windowHeight * 0.5) - (this.radius)
        this.draw()
    }
}

squaresArray = []

for(var i = 0; i <= squaresNumber; i++){
    squaresArray.push(new Square(distance * (i+1)))
}

function animate(){
    
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < squaresArray.length; i++){
        
        squaresArray[i].update()
        squaresArray[i].radius -= 0.25


        if(squaresArray[i].radius < 0){
            squaresArray[i].radius = squaresArray.length * distance
        }
        console.log(squaresArray[i].radius)
    }
    
}
animate()
