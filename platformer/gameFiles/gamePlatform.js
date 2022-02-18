Game.Platform = class {
  constructor(x, y, w, h, r, g, b, a, speed = 5) {
    this.pos = new Vector(x, y);
    this.w = w;
    this.h = h;
    this.color = this.rgbaCol(r, g, b, a);

    //values for entities to inherit while colliding
    this.bounce = 0.6;
    this.frictionCoeff = 0.6;
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
};
