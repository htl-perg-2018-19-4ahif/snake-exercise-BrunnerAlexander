var ansi = require('ansi'), cursor = ansi(process.stdout);
var keypress = require('keypress');
keypress(process.stdin);

var fieldHeight = 15;
var fieldWidth = 35 ;
var snakeX = 7;
var snakeY = 18;
var snakeDirX = 0;
var snakeDirY = 0;
var appleX;
var appleY;
var speed = 10;

//Feld Zeichnen
process.stdout.write('\x1Bc');
process.stdout.write('\x1B[?25l');
for(let i = 0 ; i < fieldHeight; i++){
    for(let j = 0; j < fieldWidth; j++){
        if(i == 0 || i == fieldHeight-1 || j == 0 || j == fieldWidth-1){
            cursor.goto(j,i).bg.grey().write(' ');
        }
    }
}

//Eingabefunktion
process.stdin.on('keypress', input);

//Apfel und Snake zeichnen
cursor.bg.green().goto(snakeY,snakeX).write(' ');
drawApple();

//Spiel starten
game();


function game(){
    cursor.bg.black().goto(snakeY,snakeX).write(' ');
    snakeX += snakeDirX;
    snakeY += snakeDirY;

    if(snakeY == 1 || snakeX == 1 || snakeY == fieldWidth-1 || snakeX == fieldHeight-1){
        cursor.reset();
        cursor.red().goto(Math.floor(fieldWidth/2)-3, Math.floor(fieldHeight/2)).write('GAME OVER');
        cursor.reset();
        cursor.goto(0,fieldHeight);
        process.exit(-1);
    }
    
    if(snakeX == appleX && snakeY == appleY){
        drawApple();

        speed++;
    }


    cursor.bg.green().goto(snakeY,snakeX).write(' ');


    setTimeout(game, 2000/speed);
    process.stdin.setRawMode(true);
}

function input(ch, key){
    switch(key.name){
        case "p": 
            process.exit(-1);
        case "up":
            snakeDirX = -1;
            snakeDirY = 0;
            break;
        case "down":
            snakeDirX = 1;
            snakeDirY = 0;
            break;
        case "left":
            snakeDirX = 0;
            snakeDirY = -1;
            break;
        case "right":
            snakeDirX = 0;
            snakeDirY = 1;
            break;
    }
}

function drawApple(){
    appleX = Math.floor(Math.random() * ((fieldHeight-1) - 2) + 2);
    appleY = Math.floor(Math.random() * ((fieldWidth-1) - 2) + 2);

    cursor.bg.red().goto(appleY,appleX).write(' ');
}