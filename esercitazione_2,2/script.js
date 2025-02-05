
var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "green", 210, 120);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    this.newPos = function() {
        // Non è più necessario aggiornare la posizione con velocità
    }    
}
function updateGameArea() {
    myGameArea.clear();    
    myGamePiece.update();
}

function moveup() {
    myGamePiece.y -= 30; 
}

function movedown() {
    myGamePiece.y += 30; 
}

function moveleft() {
    myGamePiece.x -= 30; 
}

function moveright() {
    myGamePiece.x += 30; 
}