class Paddle {
  constructor(x, speed=5, isShowVisual) {
    this.x = x;
    this.y = height / 2;
    this.width = 20;
    this.height = 100;
    this.speed = speed / (fps/10);
    this.isShowVisual = isShowVisual;
    this.isAI = false;
    if(this.x < width/2) this.side = 'left';
    if(this.x > width/2) this.side = 'right';
  }
  display() {
    noFill();
    stroke(255);
    strokeWeight(4);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }
  update() {
    if(!this.isAI) {
      if (keyIsDown(UP_ARROW)) {
        if(this.y - this.height/2 > 0) this.y -= this.speed;
      }
      if(keyIsDown(DOWN_ARROW)) {
        if(this.y + this.height/2 < height) this.y += this.speed;
      }
    }
  }
  opp(ball, bias=0, isDynamicMove=false, isTargetting=false) {
    if(this.isAI) {

    let predictedY = width/2; // - bias makes it so that it will stay in the middle instead of an offset
    let predictedX;
    let targetX = 0;
    let targetY = 0;

    if(this.side == 'left') {
      if(ball.xVel < 0) predictedY = this.predictY(this.x + this.width/2 + ball.r, ball.x, ball.y, ball.xVel, ball.yVel, ball);
      predictedX = this.x + this.width/2 + ball.r;
    }
    if(this.side == 'right') {
      if(ball.xVel > 0) predictedY = this.predictY(this.x - this.width/2 - ball.r, ball.x, ball.y, ball.xVel, ball.yVel, ball);
      predictedX = this.x - this.width/2 - ball.r;
    }
    //TARGETTING
    if(isTargetting) {
    let opponnent;
    if(this.side == 'right') {
      opponnent = paddleLeft;
      targetX = ball.r;
    }
    if(this.side == 'left') {
      opponnent = paddleRight;
      targetX = width - ball.r;
    }
    if(opponnent.y < height/2) targetY = height - ball.r;
    if(opponnent.y >= height/2) targetY = ball.r;
      //ANGLE
      let angle_desired = 0;
      angle_desired = this.find_angle_relative(predictedX, predictedY, targetX, targetY);
      if(this.side == 'left') bias = this.convert_angle(angle_desired, ball, 45, 90);
      if(this.side == 'right') bias = this.convert_angle(angle_desired, ball, 45, 90);
    }
    //BIAS
    if(bias > this.height/2) {
      bias = this.height/2;
      console.log('Bias was greater than height of paddle, changed to:', bias);
    } if(bias < -this.height/2) {
      bias = -this.height/2;
      console.log('Bias was less than height of paddle, changed to:', bias);
    }
    //fine tunes movement when the speed would normally be more innacurate (dynamicMove)
    if(isDynamicMove) { if(Math.abs(predictedY - this.y + bias) < this.speed) this.y = predictedY + bias; }
    //MOVEMENT
      //constrain within canvas
    if(ball.xVel < 0 && this.side == 'left') {
      if(this.y - this.height/2 > 0) if(this.y > predictedY + bias) this.y -= this.speed;
      if(this.y + this.height/2 < height) if(this.y < predictedY + bias) this.y += this.speed;
    } else if(ball.xVel > 0 && this.side == 'right') {
      if(this.y - this.height/2 > 0) if(this.y > predictedY + bias) this.y -= this.speed;
      if(this.y + this.height/2 < height) if(this.y < predictedY + bias) this.y += this.speed;
    } else {
      if(this.y < height/2) this.y += this.speed;
      if(this.y > height/2) this.y -= this.speed;
    }
  }
}
  predictY(endX, xPos, yPos, xSpeed, ySpeed, ball) {
    let xDistToEndX = endX - xPos;
    let predictedY = ((xDistToEndX / xSpeed) * ySpeed) + yPos;

    if(predictedY - ball.r + ball.yVel < 0) {
      xPos = this.predictX(ball.r + ball.yVel, ball.x, ball.y, ball.xVel, ball.yVel);
      ySpeed *= -1;
      yPos = ball.r + ySpeed;
      //visual
      if(this.isShowVisual) ellipse(this.predictX(ball.r + ball.yVel, ball.x, ball.y, ball.xVel, ball.yVel), yPos, ball.r*2);
    }
    if(predictedY + ball.r + ball.yVel > height) {
      xPos = this.predictX(height - ball.r + ball.yVel, ball.x, ball.y, ball.xVel, ball.yVel);
      ySpeed *= -1;
      yPos = height-ball.r + ySpeed;
      //visual
      if(this.isShowVisual) ellipse(this.predictX(height - ball.r + ball.yVel, ball.x, ball.y, ball.xVel, ball.yVel), yPos, ball.r*2);
    }
    xDistToEndX = endX - xPos;
    predictedY = ((xDistToEndX / xSpeed) * ySpeed) + yPos;
    //visual
    if(this.isShowVisual) ellipse(endX, predictedY, ball.r*2);
    return(predictedY);
  }
  predictX(endY, xPos, yPos, xSpeed, ySpeed) {
    let yDistToEndY = endY - yPos;
    let predictedX = ((yDistToEndY / ySpeed) * xSpeed) + xPos;

    return(predictedX);
  }
  find_angle_global(predictedX, predictedY, opponnent, ball) { //OLD
    let targetX = 0;
    let targetY = 0;

    if(opponnent.y < height/2) targetY = height - ball.r;
    if(opponnent.y > height/2) targetY = ball.r;
    if(opponnent.y == height/2) targetY = ball.r;
    if(this.side == 'left') targetX = width - ball.r;
    if(this.side == 'right') targetX = ball.r;

    angleMode(RADIANS);
    let dx = targetX - predictedX;
    let dy = predictedY - targetY;
    let inRads = Math.atan2(dy, dx);
    //map to coord system when 0 degree is at 3 O'clock, 270 at 12 O'clock
    if (inRads < 0) {
      inRads = Math.abs(inRads);
    }
    else {
      inRads = 2*Math.PI - inRads;
    }
    //visual
    strokeWeight(2);
    line(predictedX, predictedY, targetX, targetY);
    strokeWeight(4);
    line(predictedX, predictedY, predictedX + 50 * Math.cos(inRads), predictedY + 50 * Math.sin(inRads))
  }
  find_angle_relative(predictedX, predictedY, targetX, targetY) { //NEW
    let translate_x = predictedX;
    let translate_y = predictedY;
    translate(translate_x, translate_y);
    let v1;
    if(this.side == 'left') v1 = createVector(1, 0);
    if(this.side == 'right') v1 = createVector(-1, 0);
    let v2 = createVector(targetX - translate_x, targetY - translate_y);
    // Returns the angle between two vectos
    let angle = Math.atan2(this.cross_product(v1,v2), this.dot_product(v1,v2));
    angle = angle * 180 / Math.PI;
    //visual
    if(this.isShowVisual) {
      line(0, 0, v1.x * 50, v1.y);
      line(0, 0, v2.x, v2.y);
    }
    translate(-translate_x, -translate_y);
    return(angle);
  }
  cross_product(v1, v2) { return(v1.x*v2.y-v1.y*v2.x); }
  dot_product(v1, v2) { return(v1.x*v2.x+v1.y*v2.y); }
  convert_angle(angle_desired=0, ball, maxAngle, angleDiff) {
    //if(this.side == 'left') console.log(angle_desired);
    //if(this.side == 'right') console.log(angle_desired);
    if(angle_desired > maxAngle) angle_desired = maxAngle;
    if(angle_desired < maxAngle - angleDiff) angle_desired = maxAngle - angleDiff;
    let bias;
    if(this.side == 'left') bias = map(angle_desired, maxAngle, maxAngle - angleDiff, -this.height/2, this.height/2);
    if(this.side == 'right') bias = map(angle_desired, maxAngle - angleDiff, maxAngle, -this.height/2, this.height/2);
    return(bias);
  }
}
