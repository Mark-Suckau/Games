  let ball;
  let paddleLeft;
  let paddleRight;
  let fps = 60;
  let opp_isTargetting = false;
  let opp_isDynamicMove = false;

  let rightScore = 0;
  let leftScore = 0;

//WARNING: Left Paddle is set to automatically be computer controlled

  function setup() {
    createCanvas(800, 800);
    frameRate(fps);
    ball = new Ball(20, 50);
    paddleLeft = new Paddle(60, 70, false);
    paddleRight = new Paddle(width-60, 70, false);
  }

  function draw() {
    background(0);

    strokeWeight(3);
    textSize(35);
    text(leftScore, width/2-150, 50);
    text(rightScore, width/2+150, 50);

    paddleLeft.display();
    paddleRight.display();
    paddleLeft.opp(ball, 0, opp_isDynamicMove, opp_isTargetting);
    paddleRight.opp(ball, 0, opp_isDynamicMove, opp_isTargetting);
    paddleLeft.update();
    paddleRight.update();

    ball.display();
    ball.update();
    ball.wallCollisions();
    ball.collidePaddleLeft(paddleLeft);
    ball.collidePaddleRight(paddleRight);
  }
