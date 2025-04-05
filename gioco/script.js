var myGamePiece;
var myGamePiece2; // Secondo oggetto
var gravity = 0.5; // Forza di gravità che fa scendere l'oggetto
var jumpStrength = -15; // La velocità del salto (valore negativo per andare su)
var jumpDirectionStrength = 5; // Velocità del movimento orizzontale durante il salto

var lastKey = null; // Variabile per tenere traccia dell'ultimo tasto premuto
var isKeyPressed = false; // Variabile per verificare se almeno un tasto è premuto

function startGame() {
    myGameArea.start();
    myGamePiece = new component(200, 460, "red", 0, myGameArea.canvas.height - 130); // Oggetto rosso
    myGamePiece2 = new component(200, 460, "blue", 800, myGameArea.canvas.height - 130); // Oggetto blu
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1000;  // Larghezza del canvas
        this.canvas.height = 600;  // Altezza del canvas
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        // Centrare il canvas nella pagina
        document.body.style.margin = 0;
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "center";
        document.body.style.height = "100vh"; // Altezza della pagina completa

        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
            isKeyPressed = true;
            lastKey = myGameArea.key; // Aggiorna l'ultimo tasto premuto
        });
        window.addEventListener('keyup', function (e) {
            if (myGameArea.key === e.keyCode) {
                myGameArea.key = false;
                isKeyPressed = false; // Nessun tasto è premuto
            }
        });
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Definizione dell'oggetto di gioco
function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.isJumping = false; // Variabile per il salto
    this.direction = 0; // 0 = nessun movimento, 1 = destra, -1 = sinistra

    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.newPos = function () {
        // Movimento orizzontale
        this.x += this.speedX;

        // Limita il movimento orizzontale
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > myGameArea.canvas.width) this.x = myGameArea.canvas.width - this.width;

        // Movimento verticale (gravità e salto)
        this.y += this.speedY;

        // Controllo se l'oggetto è a terra
        if (this.y + this.height > myGameArea.canvas.height) {
            this.y = myGameArea.canvas.height - this.height;
            this.speedY = 0; // Ferma la velocità verticale
            this.isJumping = false; // Impedisce di saltare di nuovo finché non tocca terra
        } else {
            this.speedY += gravity; // Applica la gravità
        }
    };

    // Funzione per la gestione delle collisioni con un altro oggetto
    this.checkCollision = function(otherObj) {
        if (this.x + this.width > otherObj.x &&
            this.x < otherObj.x + otherObj.width &&
            this.y + this.height > otherObj.y &&
            this.y < otherObj.y + otherObj.height) {
            
            // Collisione orizzontale
            if (this.direction === 1 && this.x + this.width > otherObj.x) {
                this.x = otherObj.x - this.width;
            } 
            if (this.direction === -1 && this.x < otherObj.x + otherObj.width) {
                this.x = otherObj.x + otherObj.width;
            }
        }
    }
}

// Funzione principale di aggiornamento
function updateGameArea() {
    myGameArea.clear();

    // Gestione tasti premuti
    if (!isKeyPressed) {
        myGamePiece.speedX = 0;
        myGamePiece2.speedX = 0; // Fermiamo anche il secondo oggetto
    } else {
        // Gestione dei tasti premuti per l'oggetto rosso
        switch (lastKey) {
            case 37: // Freccia sinistra
                myGamePiece.speedX = -5;
                myGamePiece.direction = -1;
                break;
            case 39: // Freccia destra
                myGamePiece.speedX = 5;
                myGamePiece.direction = 1;
                break;
            case 38: // Freccia su (salto)
                if (!myGamePiece.isJumping) {
                    myGamePiece.speedY = jumpStrength;
                    myGamePiece.isJumping = true;
                    if (myGamePiece.direction === -1) {
                        myGamePiece.speedX = -jumpDirectionStrength;
                    } else if (myGamePiece.direction === 1) {
                        myGamePiece.speedX = jumpDirectionStrength;
                    }
                }
                break;
        }

        // Gestione dei tasti premuti per l'oggetto blu
        switch (lastKey) {
            case 65: // Tasto 'A' (sinistra per l'oggetto blu)
                myGamePiece2.speedX = -5;
                myGamePiece2.direction = -1;
                break;
            case 68: // Tasto 'D' (destra per l'oggetto blu)
                myGamePiece2.speedX = 5;
                myGamePiece2.direction = 1;
                break;
            case 87: // Tasto 'W' (salto per l'oggetto blu)
                if (!myGamePiece2.isJumping) {
                    myGamePiece2.speedY = jumpStrength;
                    myGamePiece2.isJumping = true;
                    if (myGamePiece2.direction === -1) {
                        myGamePiece2.speedX = -jumpDirectionStrength;
                    } else if (myGamePiece2.direction === 1) {
                        myGamePiece2.speedX = jumpDirectionStrength;
                    }
                }
                break;
        }
    }

    // Gestiamo le collisioni tra i due oggetti
    myGamePiece.checkCollision(myGamePiece2);
    myGamePiece2.checkCollision(myGamePiece);

    // Aggiorna posizione e disegna gli oggetti
    myGamePiece.newPos();
    myGamePiece.update();
    myGamePiece2.newPos();
    myGamePiece2.update();
}
