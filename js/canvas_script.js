
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
var squaresNumber = 38
var distance = 50

var c = canvas.getContext("2d");

function SquareColor(radius){
    this.strokeWidth = distance/this.radius
    this.radius = radius
    this.draw = function(){


        c.lineWidth = this.strokeWidth;

        c.beginPath()
        var gradient = c.createLinearGradient(this.x, this.y,
            this.x + this.radius*2, this.y + this.radius*2);
        gradient.addColorStop("0", "red");
        gradient.addColorStop("0.125", "yellow");
        gradient.addColorStop("0.25", "green");
        gradient.addColorStop("0.375", "cyan");
        gradient.addColorStop("0.5" ,"blue");
        gradient.addColorStop("0.625", "cyan");
        gradient.addColorStop("0.75", "green");
        gradient.addColorStop("0.875", "yellow");
        gradient.addColorStop("1.0", "red");

        c.strokeStyle = gradient;


        c.rect(this.x, this.y, this.radius * 2, this.radius * 2)
        c.stroke()
    }

    this.update = function(){
        this.strokeWidth = this.radius * 0.025
        if(this.strokeWidth > 25){
            this.strokeWidth = 25
        }
        this.radius = this.radius
        this.x = (windowWidth * 0.5) - (this.radius)
        this.y = (windowHeight * 0.5) - (this.radius)
        this.draw()
    }
}

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
        if(this.strokeWidth > 25){
            this.strokeWidth = 25
        }
        this.radius = this.radius
        this.x = (windowWidth * 0.5) - (this.radius)
        this.y = (windowHeight * 0.5) - (this.radius)
        this.draw()
    }
}

squaresArray = []
squaresColorArray = []

for(var i = 0; i <= squaresNumber; i++){
    squaresArray.push(new Square(distance * (i+1)))
    squaresColorArray.push(new SquareColor((distance + 0.25) * (i+1)))
}



function animate(){
    
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < squaresArray.length; i++){
        if(i%5 == 0){
            squaresColorArray[i].update()
        }

        squaresArray[i].update()
        
        squaresArray[i].radius -= 0.25
        squaresColorArray[i].radius -= 0.25


        if(squaresArray[i].radius < 1){
            squaresArray[i].radius = squaresArray.length * distance
        }
        if(squaresColorArray[i].radius < 1){
            squaresColorArray[i].radius = squaresColorArray.length * distance
        }
        console.log(squaresArray[i].radius)
    }
    
}
animate()
