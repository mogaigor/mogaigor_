
function startGame() {
    myGamePiece.loadImages(running);
    myGameArea.start();
    bushObject.loadImages();
}

var myGamePiece = {
    speedX: 0,
    speedY: 0,
    width: 60,
    height: 60,
    x: 10,
    y: 120,
    imageList: [], // Array to store loaded images
    contaFrame: 0, // Frame counter
    actualFrame: 0, // Current frame to display
    image: null, // Current image

    update: function() {
        this.tryY = this.y + this.speedY;
        this.tryX = this.x + this.speedX;

    //Prima di spostarmi realmente verifico che non ci siano collisioni
        this.crashWith(bushObject);
        this.contaFrame++;
        if (this.contaFrame == 50) { // Change frame every 50 frames
            this.contaFrame = 0;
            this.actualFrame = (this.actualFrame + 1) % this.imageList.length;
            this.image = this.imageList[this.actualFrame];
        }
    },
    crashWith: function(otherobj) {
        var myleft = this.tryX;
        var myright = this.tryX + this.width;
        var mytop = this.tryY;
        var mybottom = this.tryY + this.height;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + otherobj.width;
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + otherobj.height;
        var crash = true;
    
        //NON HO COLLISIONI SE: Un oggetto è sopra oppure sotto oppure a destra oppure a sinistra dell’altro
        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
          this.x = this.tryX; //Se non ho collisioni sposto realmente l’oggetto
          this.y = this.tryY;
        }
        else //HO COLLISIONI MA PER ORA NON FACCIO NIENTE
        {
        }
      },
    loadImages: function(running) {
        console.log("prova");
        for (let imgPath of running) {
            var img = new Image();
            img.src = imgPath;
            this.imageList.push(img);
        }
        this.image = this.imageList[this.actualFrame];
    }
};

var bushObject = {
    width: 100,
    height: 50,
    x: 100,
    y: 270 - 50,
  
    loadImages: function() {
      this.image = new Image(this.width, this.height);
      this.image.src = "https://i.ibb.co/CPdHYdB/Bush-1.png";
    }
  };


var myGameArea = {
    canvas: document.createElement("canvas"),
    context: null,
    interval: null,

    start: function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 1); // Update game every 20ms
    },

    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawGameObject: function (gameObject) {
        this.context.drawImage(
            gameObject.image,
            gameObject.x,
            gameObject.y,
            gameObject.width,
            gameObject.height
        );
    }
};

var running = ['img1.png', 'img2.png', 'img3.png']; // Example paths for images



function updateGameArea() {
    myGameArea.clear();
    myGamePiece.update();
    myGameArea.drawGameObject(myGamePiece);
    myGameArea.drawGameObject(bushObject);
}

// Control functions
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
