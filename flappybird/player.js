class Player {
  constructor(x = 200, y = height/2, d = 25) {
    this.pos = createVector(x, y);
    this.r = d;
    this.dir = createVector(0, 0);

    this.score = 0;

    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
  }
  display() {
    stroke(220);
    strokeWeight(4);
    noFill();
    ellipse(this.pos.x, this.pos.y, this.r * 2);

    //// TEMP
    line(this.pos.x, this.pos.y, this.pos.x + this.dir.x, this.pos.y + this.dir.y);
  }
  update() {
    this.vel.add(this.acc).limit(13);
    this.pos.add(this.vel);

    this.acc.mult(0);
  }
  applyForce(f) {
    this.acc.add(f);
  }
  edges() {
    if(this.pos.x + this.r > width) {
      this.pos.x = width - this.r - this.acc.x;
      this.vel.x *= 0;
    }
    if(this.pos.x - this.r < 0) {
      this.pos.x = 0 + this.r + this.acc.x;
      this.vel.x *= 0;
    }
    if(this.pos.y + this.r > height) {
      this.pos.y = height - this.r - this.acc.y;
      this.vel.y *= 0;
    }
    if(this.pos.y - this.r < 0) {
      this.pos.y = 0 + this.r + this.acc.y;
      this.vel.y *= 0;
    }
  }
    displayScore() {
      textSize(32);
      rectMode(CENTER);
      text(this.score, width/2, 32);
      rectMode(CORNER);
  }
  changeDir() {
    //changes the dir based on the velocity
    let velMax = 13
    this.dir.x = map(this.vel.x , 0, velMax, 90, 90);
    this.dir.y = map(this.vel.y, 0, velMax, 0, -90) * -1;
    this.dir.normalize().mult(50);
  }
}
