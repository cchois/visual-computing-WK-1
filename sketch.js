var ship;
var lasers =[];
var laserSound;
var asteroids = [];
var  gameFont;
var score = 0;
var gameState ='MENU';

function preload() {
  laserSound = loadSound('audio/laser.wav');
  hitSound = loadSound('audio/hit.m4a');
  collisionSound = loadSound ('audio/bang_lg.wav');
  gameFont = loadFont('PressStart2P-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);
   /*if (gameState === "MENU") {
    drawMenu();
  } else if (gameState === "PLAYING") {
    playGame();
  } else if (gameState === "GAMEOVER") {
    drawGameOver();
  }*/
  
  ship.show();
  ship.update();
  for (var i = lasers.length - 1; i >= 0; i--){
    lasers[i].render();
    lasers[i].update();
    if (lasers[i] && lasers[i].offscreen()){
      lasers.splice(i, 1);
    }else{

    for(var j = asteroids.length - 1; j >= 0; j--){
      if (lasers[i].hits(asteroids[j])){
        if (asteroids[j].r > 20){
          var newAsteroids = asteroids[j].breakup();
          asteroids = asteroids.concat(newAsteroids);
        }
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
      }
    }}
  }

  for (let i = asteroids.length - 1; i >= 0; i--) {
        if (ship.hits(asteroids[i])){
          //gameState = "GAMEOVER";
          console.log('opps');

        }
        asteroids[i].update();
        asteroids[i].show();
        asteroids[i].edges();
    }
   //drawScore();
}


function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false)
}

function keyPressed() {

  /*if (gameState === "MENU" && keyCode === ENTER) {
    startGame();
  } else if (gameState === "GAMEOVER" && keyCode === ENTER) {
    resetGame();
  } else if (gameState === "PLAYING")*/ 
  if (key == ' '){
    lasers.push(new Laser(ship.pos, ship.heading));

    if (!laserSound.isPlaying()) {
      laserSound.play();
    }


  }else if (keyCode == RIGHT_ARROW){
      ship.setRotation(0.1);

  }else if (keyCode == LEFT_ARROW){
      ship.setRotation(-0.1);

  }else if (keyCode == UP_ARROW){
    ship.boosting(true);

  }
}



function drawMenu() {
  
  background(0);
  for (let i = asteroids.length - 1; i >= 0; i--) {
    asteroids[i].update();
    asteroids[i].show();
    asteroids[i].edges();
  }
  fill(255);
  textFont( gameFont); 
  textAlign(CENTER);
  textSize(32);
  text("ASTEROIDS", width / 2, height / 2 - 40);
  textSize(16); 
  text("Press ENTER to Start", width / 2, height / 2 + 20);
}


/*function drawGameOver() {
  fill(255);
  textFont( gameFont); 
  textAlign(CENTER);
  textSize(32);
  text("GAME OVER", width / 2, height / 2 - 40);
  textSize(16);
  text(`Final Score: ${score}`, width / 2, height / 2);
  text("Press ENTER to Return to Menu", width / 2, height / 2 + 40);
}


function drawScore() {
  fill(255);
  textFont( gameFont); /
  textAlign(LEFT);
  textSize(16);
  text(`Score: ${score}`, 10, 20);
}

function startGame() {
  gameState = "PLAYING";
  score = 0;
}

function resetGame() {
  gameState = "MENU";
}*/
