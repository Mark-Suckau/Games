class Pipe {
  constructor(x, width, minPipeLength, gapMin, gapMax) {
    this.pos = createVector(x, 0);
    this.width = width;
    this.col = {
      r: 0,
      g: 0,
      b: 0,
      a: 255,
    }

    this.acc = createVector(0, 0);
    this.vel = createVector(-5, 0);

    //creates appropriate gap between pipes
    let gapLength = random(gapMin, gapMax);
    this.gapTop = random(minPipeLength, height - minPipeLength - gapLength);
    this.gapBot = this.gapTop + gapLength;
  }
  display() {
    stroke(220);
    strokeWeight(4);
    fill(this.col.r, this.col.g, this.col.b, this.col.a);

    //top
    rect(this.pos.x, 0, this.width, this.gapTop);
    //bot
    rect(this.pos.x, this.gapBot, this.width, height);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  isIntersectingTop(obj) {
   return(obj.pos.x + obj.r > this.pos.x + this.vel.x &&
          obj.pos.x - obj.r < this.pos.x + this.width &&
          obj.pos.y - obj.r < this.gapTop);
  }
  isIntersectingBot(obj) {
   return(obj.pos.x + obj.r > this.pos.x + this.vel.x &&
          obj.pos.x - obj.r < this.pos.x + this.width &&
          obj.pos.y + obj.r > this.gapBot);
  }
  collide(obj, manualOverride = false) {
    if(this.isIntersectingBot(obj) || this.isIntersectingTop(obj) || manualOverride) {
      this.vel.x = 5;
      if(!isRetainScore) {
        obj.score = 0;
      }
      //only removes a life if it was an actuall collision
      if(!manualOverride && !isLivesInfinite) lives -= 1;

      this.col.r = 100;
      this.col.g = 0;
      this.col.b = 0;
      this.col.a = 100;

      this.acc.x = 0.3;
    }

    let info = {
      //top pipe
      //checks if obj intersects the pipe and creates a small hitbox that's on the
      //inside middle part which is expanded or made smaller based on the velocity
      //hitbox = from gapTop to velocity y + gapTop, vel must be negative if going up
      //meaning it will only hit the hitbox if it is moving up

      //bottom pipe
      //checks if obj intersects the pipe and creates a small hitbox that's on the
      //inside middle part which is expanded or made smaller based on the velocity
      //hitbox = from gapTop to velocity y + gapTop, vel must be positive if going down
      //meaning it will only hit the hitbox if it is moving down
    };

    //top pipe
    if(this.isIntersectingTop(obj) && obj.pos.y - obj.r > this.gapTop + obj.vel.y * 2) {
      obj.pos.y = this.gapTop + obj.r;
      obj.vel.y = 0;
      if(!isRetainScore) {
        obj.score = 0;
      }
    }

    //bottom pipe
    if(this.isIntersectingBot(obj) && obj.pos.y + obj.r < this.gapBot + obj.vel.y * 2) {
      obj.pos.y = this.gapBot - obj.r;
      obj.vel.y = 0;
      if(!isRetainScore) {
        obj.score = 0;
      }
    }
  }
  score(obj) {
    if(this.isIntersectingTop(obj) == false && this.isIntersectingBot(obj) == false &&
      obj.pos.x > this.pos.x && obj.pos.x < this.pos.x - this.vel.x * 2) {
        obj.score += 1;

        this.col.g = 100;
        this.col.a = 100;
      }
  }
}
