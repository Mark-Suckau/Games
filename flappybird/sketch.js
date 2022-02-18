//TO DO:
//add image and overlay it with the ellipse
//rotate said image based on the direction vector contained in player.js

//objects
let player;
let pipes = [];
let respawnButton;
//vectors
let gravity;
//other variables
let isAlive = false; //whether or not you are alive (don't change here)
//CONFIGURABLE:
let lives = 1; //the amount of times you can hit a pipe without death
let isLivesInfinite = false; //if true, you will never die
let livesRegain = 5; //how many lives you get after you respawn
let isRetainScore = false; //whether or not you retain your score after you hit a pipe

function setup() {
  createCanvas(800, 800);
  frameRate(60);

  player = new Player(100, 300, 25);
  respawnButton = new Button(width/2, height/2, 300, 200);

  gravity = createVector(0, 0.4);
}

function draw() {
  if(lives <= 0) {

    isAlive = false;
  }
if(isAlive) { //IMPORTANT
    background(10);
    //each time the amount of frames is divisible by the fps with a remainder of 0
    if(frameCount % 80 == 0 || frameCount == 0) {
      pipes.push(new Pipe(width, 50, 25, 200, 300));
    }

    frames += 1;
    //backwards counting for loop because it is deleting things
    for(let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].display();
      pipes[i].update();
      pipes[i].collide(player);
      pipes[i].score(player);
      //removes pipes if they are offscreen
      if(pipes[i].pos.x + pipes[i].width < 0 || pipes[i].pos.x > width) {
        pipes.splice(i, 1);
      }
    }
    player.display();
    player.update();
    player.edges();
    player.changeDir();

    player.applyForce(gravity);

    stroke(50);
    strokeWeight(3);
    fill(255);
    player.displayScore();
  }
if(isAlive == false) { //IMPORTANT
    if(pipes.length > 0) {
      background(10, 200);

      player.display();
      player.update();
      player.edges();
      player.changeDir();

      player.applyForce(gravity);

      for(let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].vel.x = 12;
        pipes[i].update();
        //manualOverride is true so it forces the pipes to move off the screen
        pipes[i].display();
        pipes[i].collide(player, true);
        pipes[i].score(player);
        //removes pipes if they are offscreen
        if(pipes[i].pos.x + pipes[i].width < 0 || pipes[i].pos.x > width) {
          pipes.splice(i, 1);
        }
      }
    }

    //only allows the menu to appear once the pipes leave the screen
    if(pipes.length == 0) {
      background(10);
      //because lives are initated as more than 0 at startup and isAlive is false,
      //if the lives > 0 and isAlive == true, then it means the page was just refreshed
        textSize(100);
        fill(50, 100, 50);
        noStroke();
        textAlign(CENTER);
        if(lives > 0) {
        text('Flappy Bird', width/2, 200);
        textSize(20);
        strokeWeight(0.5);
        text('(But worse)', width/2, 250);
      } else {
        fill(70, 20, 20);
        text('You Died', width/2, 200);
      }
      //keeping player onscreen at the menu
      player.display();
      player.update();
      player.edges();
      player.changeDir();

      player.applyForce(gravity);

      //MENU
      respawnButton.display();
      respawnButton.mouseOver();
      respawnButton.update();
      if(respawnButton.isClickUp) {
        respawnButton.isClickUp = false;
        player.score = 0;
        isAlive = true;
        lives = livesRegain;
      }
      //resetting isClickUp so it doesn't stay true even after the initial release
      if(respawnButton.isClickUp) respawnButton.isClickUp = false;
    }
  }
}

//jump on spacebar
function keyPressed() {
  //can only jump if isAlive == true
  if (keyCode == 32 && isAlive) {
    player.vel.y = -10;
  }
}

function mousePressed() {
  if(respawnButton.isMouseOver && isAlive == false) {
    respawnButton.isClickDown = true;
  }
}

function mouseReleased() {
  if(respawnButton.isMouseOver && isAlive == false) {
    respawnButton.isClickUp = true;
  }
  respawnButton.isClickDown = false;
}
