Game.Player = class {
  constructor(x, y, w, h, r, g, b, a) {
    this.pos = new Vector(x, y);

    this.w = w;
    this.h = h;
    this.color = this.rgbaCol(r, g, b, a);
    this.history = [];

    // unevaluated collisions
    this.unevalCollisions = [];

    // evaluated collisions
    this.colliding = {
      top: false,
      bottom: false,
      right: false,
      left: false,
    };

    this.slipAccelerationDefault = 1;
    this.slipAcceleration = this.slipAccelerationDefault; // controlls how much you slip when accelerating (lower = more slip)
    this.jumpPower = 20;
    this.jumping = true;
    this.jumpMomentum = false;

    this.vel = new Vector(0, 0);

    this.acc = new Vector(0, 0); // for applying constant forces (ex. gravity, wind)
    this.speed = 5;

    this.minVel = new Vector(-3, -15);
    this.maxVel = new Vector(3, 15);
  }

  update() {
    this.vel.addV(this.acc);

    // rounding and constraining vel
    this.vel.constrainV(this.minVel, this.maxVel);
    if (this.vel.x > 0) this.vel.x = Math.floor(this.vel.x * 10000) / 10000;
    if (this.vel.x < 0) this.vel.x = Math.ceil(this.vel.x * 10000) / 10000;
    if (this.vel.y > 0) this.vel.y = Math.floor(this.vel.y * 10000) / 10000;
    if (this.vel.y < 0) this.vel.y = Math.ceil(this.vel.y * 10000) / 10000;

    this.keepHistory(50); // before adding of vel to pos to get prev frame values for index 0

    this.pos.addV(this.vel);
    this.pos.x = Math.round(this.pos.x);
    this.pos.y = Math.round(this.pos.y);
    this.acc.x = 0;
    this.acc.y = 0;
  }

  //TRAIL
  keepHistory(length) {
    let state = {
      x: this.pos.x,
      y: this.pos.y,
      w: this.w,
      h: this.h,
      color: this.rgbaCol(5, 5, 5, 1),
    };
    this.history.unshift(state);
    if (this.history.length > length) this.history.pop();

    for (let i = 0; i < this.history.length; i++) {
      this.history[i].color.rgba = `rgba(
        ${this.history[i].color.r},
        ${this.history[i].color.g},
        ${this.history[i].color.b},
        ${this.history[i].color.a - i / this.history.length}
        )`;
    }
  }

  rgbaCol(r, g, b, a) {
    // returns object contain rgba values and a rgba syntax color
    let color = {
      rgba: `rgba(${r},${g},${b},${a})`,
      r: r,
      g: g,
      b: b,
      a: a,
    };
    return color;
  }

  //FORCES
  applyForce(f) {
    this.acc.addV(f);
  }

  applyFriction(coeff, colliding) {
    if (colliding.top || colliding.bottom) this.vel.x *= coeff;
    if (colliding.right || colliding.left) this.vel.y *= coeff;
  }

  // MOVEMENT
  jump() {
    if (this.colliding.bottom) this.jumping = false;
    if (!this.jumping) {
      this.vel.y = -this.jumpPower;
      this.jumping = true;
      this.slipAcceleration = this.slipAccelerationDefault;
    }
  }

  bounceXMaxThreshold(bounce, threshold = 1) {
    if (this.vel.x < threshold) {
      this.vel.x = 0;
    } else {
      this.vel.x *= -bounce;
    }
  }
  bounceXMinThreshold(bounce, threshold = -1) {
    if (this.vel.x > threshold) {
      this.vel.x = 0;
    } else {
      this.vel.x *= -bounce;
    }
  }
  bounceYMaxThreshold(bounce, threshold = 1) {
    if (this.vel.y < threshold) {
      this.vel.y = 0;
    } else {
      this.vel.y *= -bounce;
    }
  }

  bounceYMinThreshold(bounce, threshold = -1) {
    if (this.vel.y > threshold) {
      // needs to be empty, otherwise would stick to bottom of objects when sliding from slides
    } else {
      this.vel.y *= -bounce;
    }
  }

  move(dir) {
    let moveXAccelerate = dir * (this.speed * this.slipAcceleration);
    this.vel.x += moveXAccelerate;
  }
  // COLLISION
  collideWorld(world) {
    let colliding = {
      top: false,
      bottom: false,
      right: false,
      left: false,
    };
    // Left
    if (this.leftSide < 0) {
      this.bounceXMinThreshold(world.bounce, -1);
      this.pos.x = 0;
      colliding.left = true;
    } else if (this.pos.x > 0) {
      colliding.left = false;
    }
    // Right
    if (this.rightSide > world.width) {
      this.bounceXMaxThreshold(world.bounce, 1);
      this.pos.x = world.width - this.w;
      colliding.right = true;
    } else if (this.pos.x < world.width - this.w) {
      colliding.right = false;
    }
    // Top
    if (this.topSide < 0) {
      this.bounceYMinThreshold(world.bounce, -1);
      this.pos.y = 0;
      colliding.top = true;
    } else if (this.pos.y > 0) {
      colliding.top = false;
    }
    // Bottom
    if (this.bottomSide >= world.height) {
      this.bounceYMaxThreshold(world.bounce, 1);
      this.pos.y = world.height - this.h;

      colliding.bottom = true;
      this.slipAccelerationDefault = world.slip;
    } else if (this.pos.y + this.h < world.height) {
      colliding.bottom = false;
    }
    this.applyFriction(world.frictionCoeff, colliding);

    return colliding;
  }

  collideRect(obj) {
    // Initalizing
    let dx = this.pos.x + this.w / 2 - (obj.pos.x + obj.w / 2);
    let dy = this.pos.y + this.h / 2 - (obj.pos.y + obj.h / 2);
    let width = (this.w + obj.w) / 2;
    let height = (this.h + obj.h) / 2;
    let crossWidth = width * dy;
    let crossHeight = height * dx;

    let colliding = {
      top: false,
      bottom: false,
      left: false,
      right: false,
    };
    // Collision Detection
    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
      if (crossWidth > crossHeight) {
        if (crossWidth > -crossHeight) {
          colliding.top = true;
        } else {
          colliding.right = true;
        }
      } else {
        if (crossWidth > -crossHeight) {
          colliding.left = true;
        } else {
          colliding.bottom = true;
        }
      }
    }
    // Collision Effect
    this.applyFriction(obj.frictionCoeff, colliding);

    if (colliding.left) {
      this.pos.x = obj.pos.x + obj.w;
      this.bounceXMinThreshold(obj.bounce, -1);
    }
    if (colliding.right) {
      this.pos.x = obj.pos.x - this.w;
      this.bounceXMaxThreshold(obj.bounce, 1);
    }
    if (colliding.top) {
      this.pos.y = obj.pos.y + obj.h;
      this.bounceYMinThreshold(obj.bounce, -1);
    }
    if (colliding.bottom) {
      this.bounceYMaxThreshold(obj.bounce, 1);
      this.pos.y = obj.pos.y - this.h;
      this.slipAcceleration = obj.slip;
    }

    return colliding;
  }

  handleCollisions(collisionRectArr, gameWorld) {
    // compiles collisions into a single array to be evaluated later
    this.unevalCollisions = [];

    // rect collisions
    for (let i = 0; i < collisionRectArr.length; i++) {
      this.unevalCollisions.push(this.collideRect(collisionRectArr[i]));
    }

    // world collisions
    let worldCollisions = this.collideWorld(gameWorld);
    this.unevalCollisions.push(worldCollisions);
  }

  evalCollisions() {
    // evaluates collisions and adjusts this.colliding property accordingly
    this.colliding.top = false;
    this.colliding.bottom = false;
    this.colliding.left = false;
    this.colliding.right = false;

    // need to swap sides because collideRect() returns it from other rect's perspective
    for (let i = 0; i < this.unevalCollisions.length; i++) {
      if (this.unevalCollisions[i].top) this.colliding.top = true;
      if (this.unevalCollisions[i].bottom) this.colliding.bottom = true;
      if (this.unevalCollisions[i].left) this.colliding.left = true;
      if (this.unevalCollisions[i].right) this.colliding.right = true;
    }
  }

  get leftSide() {
    return this.pos.x;
  }

  get rightSide() {
    return this.pos.x + this.w;
  }

  get topSide() {
    return this.pos.y;
  }

  get bottomSide() {
    return this.pos.y + this.h;
  }
};
