class Ball {
  constructor(r = 25, speed = 5) {
    this.x = width/2;
    this.y = height/2;
    this.r = r;
    this.speed = speed / (fps/10); //speed needs unchanged var because the velocities will change in relation to eachother
    this.xVel = this.speed;
    this.yVel = this.speed;
    this.angle = 0;
    this.reset();
  }
  display() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
  update() {
    this.x += this.xVel;
    this.y += this.yVel;
  }
  reset() {
    this.x = width / 2;
    this.y = height / 2;

    angleMode(DEGREES);
    this.angle = random(-15, 15);

    this.xVel = this.speed * cos(this.angle);
    this.yVel = this.speed * sin(this.angle);

    if(random(1) < 0.5) {
      this.xVel *= -1;
    }
  }
  wallCollisions() {
    if(this.x + this.r + this.xVel > width) {
      paddleRight.y = height / 2;
      paddleLeft.y = height / 2;
      this.reset();
      leftScore++;
      console.log('Right Side Hit');
    }
    if(this.x - this.r + this.xVel < 0) {
      paddleRight.y = height / 2;
      paddleLeft.y = height / 2;
      this.reset();
      rightScore++;
      console.log('Left Side Hit');
    }
    if(this.y + this.r + this.yVel > height) {
      this.y = height - this.r;
      this.yVel *= -1;
    }
    if(this.y - this.r + this.yVel < 0) {
      this.y = 0 + this.r;
      this.yVel *= -1;
    }
  }
  collidePaddleRight(object) {
    //checking if the ball touches the right paddle
    if(this.x + this.r + this.xVel > object.x - object.width / 2 &&
      this.y + this.r > object.y - object.height / 2 &&
      this.y - this.r < object.y + object.height / 2) {
        if(this.x - this.r < object.x - object.width / 2) {

          //calculates and adds appropriate angle based on where the ball hits the paddle
          //the radians(255) and radians(135) are the angles that the edge of
          //the paddle is mapped to

          let difference = this.y - (object.y - object.height / 2);
          //maps the y position of the ball in relation to the paddle height to the degrees
          let maxAngle = 225;
          let angleDiff = 90;
          let angle = map(difference, 0, object.height, radians(maxAngle), radians(maxAngle - angleDiff));

          this.x = object.x - object.width / 2 - this.r;
          this.xVel = this.speed * Math.cos(angle);
          this.yVel = this.speed * Math.sin(angle);
        }
      }
    }
    collidePaddleLeft(object) {
      //checking if the ball touches the left paddle
      if(this.x - this.r + this.xVel < object.x + object.width / 2 &&
        this.y + this.r > object.y - object.height / 2 &&
        this.y - this.r < object.y + object.height / 2) {
          if(this.x + this.r > object.x + object.width / 2) {

            //calculates and adds appropriate angle based on where the ball hits the paddle
            //this is how much the ball will change direction if it hits the very edge
            //of the paddle
            let difference = this.y - (object.y - object.height / 2);
            let maxAngle = 45;
            let angleDiff = 90;
            let angle = map(difference, 0, object.height, radians(maxAngle - angleDiff), radians(maxAngle))

            this.x = object.x + object.width / 2 + this.r;
            this.xVel = this.speed * Math.cos(angle);
            this.yVel = this.speed * Math.sin(angle);
          }
        }
      }
    }
