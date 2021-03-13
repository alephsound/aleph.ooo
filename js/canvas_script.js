
var canvas = document.querySelector("canvas");
var windowWidth = 0
var windowHeight = 0

function updateWindowSize(){
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
var mouseX = windowWidth * 0.5
var mouseY = windowHeight * 0.5
updateWindowSize()
window.addEventListener("mousemove", function(event){
    mouseX = event.x
    mouseY = event.y
})

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
        var alphaMultiplier = 0.002
        var alphaMinus = 75
        this.alphaValue = (this.radius -alphaMinus) * alphaMultiplier
        if(this.alphaValue <= 0){
            this.alphaValue = 0
        }
        gradient.addColorStop("0", "rgba(255, 0, 0, +"+ this.alphaValue +")");
        gradient.addColorStop("0.125", "rgba(255, 255, 0, +"+ this.alphaValue +")");
        gradient.addColorStop("0.25", "rgba(0, 255, 0, +"+ this.alphaValue +")");
        gradient.addColorStop("0.375", "rgba(0, 255, 255, +"+ this.alphaValue +")");
        gradient.addColorStop("0.5" ,"rgba(0, 0, 255, +"+ this.alphaValue +")");
        gradient.addColorStop("0.625", "rgba(0, 255, 255, +"+ this.alphaValue +")");
        gradient.addColorStop("0.75", "rgba(0, 255, 0, +"+ this.alphaValue +")");
        gradient.addColorStop("0.875", "rgba(255, 255, 0, +"+ this.alphaValue +")");
        gradient.addColorStop("1.0", "rgba(255, 0, 0, +"+ this.alphaValue +")");

        c.strokeStyle = gradient;


        c.rect(this.x, this.y, this.radius * 2, this.radius * 2)
        c.stroke()
    }

    this.update = function(){
        this.strokeWidth = this.radius * 0.025
        if(this.strokeWidth > distance+1){
            this.strokeWidth = distance+1
        }
        this.radius = this.radius
        this.x = (windowWidth * 0.5) - (this.radius) + ((mouseX - (windowWidth * 0.5))/(this.radius+1)*10)
        this.y = (windowHeight * 0.5) - (this.radius) + ((mouseY - (windowHeight * 0.5))/(this.radius+1)*10)
        this.draw()
    }
}

function Square(radius){
    this.strokeWidth = distance/this.radius
    this.radius = radius
    this.draw = function(){


        c.lineWidth = this.strokeWidth;
        
       
        

        c.strokeStyle = "white"
        c.strokeStyle = "rgba(250, 250, 250, " + (this.radius-75)*0.0025 + ")"
        c.rect(this.x, this.y, this.radius * 2, this.radius * 2)
        c.stroke()
    }

    this.update = function(){
        c.beginPath()
        this.strokeWidth = (this.radius) * 0.025
        if(this.strokeWidth > distance+2){
            this.strokeWidth = distance+2
        }
        this.radius = this.radius
        this.x = (windowWidth * 0.5) - (this.radius) + ((mouseX - (windowWidth * 0.5))/(this.radius+1)*10)
        this.y = (windowHeight * 0.5) - (this.radius) + ((mouseY - (windowHeight * 0.5))/(this.radius+1)*10)
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
        console.log(squaresColorArray[i].radius)
    }
    
}
animate()
