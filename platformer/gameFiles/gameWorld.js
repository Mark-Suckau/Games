Game.World = class {
  constructor(w, h, backgroundCol, frictionCoeff, gravity) {
    this.width = w;
    this.height = h;

    this.backgroundColor = backgroundCol;
    this.gravity = new Vector(0, 0.3);

    this.frictionCoeff = 0.97;
    this.bounce = 0.6; //how much velocity is converted in other dir when colliding (negative so it reverses dir)
    this.slip = 1;
  }
};
