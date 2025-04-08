function startGame() {
    myGamePiece.loadImages(running);
    myGameArea.start();
    bushObject.loadImages();
}

var myGamePiece = {
    width: 60,
    height: 60,
    x: 10,
    y: 120,
    imageList: [], // Array to store loaded images
    contaFrame: 0, // Frame counter
    actualFrame: 0, // Current frame to display
    image: null, // Current image

    update: function() {
        // Prima di aggiornare la posizione, verifica se ci sono collisioni con il cespuglio
        this.contaFrame++;
        if (this.contaFrame == 50) { // Change frame every 50 frames
            this.contaFrame = 0;
            this.actualFrame = (this.actualFrame + 1) % this.imageList.length;
            this.image = this.imageList[this.actualFrame];
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
    },

    // Funzione per rilevare la collisione con un altro oggetto (il cespuglio)
    crashWith: function(otherobj, direction) {
        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        
        // Direzione in cui il personaggio si sta muovendo
        if (direction === 'up') {
            mytop -= 30;
            mybottom -= 30;
        } else if (direction === 'down') {
            mytop += 30;
            mybottom += 30;
        } else if (direction === 'left') {
            myleft -= 30;
            myright -= 30;
        } else if (direction === 'right') {
            myleft += 30;
            myright += 30;
        }

        var otherleft = otherobj.x;
        var otherright = otherobj.x + otherobj.width;
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + otherobj.height;

        // Controllo della collisione
        if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
            return false; // Nessuna collisione
        }
        return true; // C'è una collisione
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

    drawGameObject: function(gameObject) {
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

// Funzioni di controllo senza velocità, ma con prevenzione delle collisioni
function moveup() {
    if (!myGamePiece.crashWith(bushObject, 'up')) {
        myGamePiece.y -= 30; // Sposta verso l'alto se non c'è collisione
    }
}

function movedown() {
    if (!myGamePiece.crashWith(bushObject, 'down')) {
        myGamePiece.y += 30; // Sposta verso il basso se non c'è collisione
    }
}

function moveleft() {
    if (!myGamePiece.crashWith(bushObject, 'left')) {
        myGamePiece.x -= 30; // Sposta verso sinistra se non c'è collisione
    }
}

function moveright() {
    if (!myGamePiece.crashWith(bushObject, 'right')) {
        myGamePiece.x += 30; // Sposta verso destra se non c'è collisione
    }
}
