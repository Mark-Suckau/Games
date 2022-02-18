class Platform {
  constructor(x, y, w, h, speed = 5, r, g, b, a) {
    this.pos = new Vector(x, y);
    this.w = w;
    this.h = h;
    this.color = this.rgbaCol(r, g, b, a);

    //values for entities to inherit while colliding
    this.bounce = 0.6;
    this.frictionCoeff = 0;
    this.slip = 1; //how much objects slip when accelerating ontop of this object

    this.speed = {
      constant: speed,
      dir: {
        x: 0,
        y: 0,
      },
    };
  }

  rgbaCol(r, g, b, a) {
    let color = {
      rgba: `rgba(${r},${g},${b},${a})`,
      r: r,
      g: g,
      b: b,
      a: a,
    };
    return color;
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
}
