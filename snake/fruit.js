class Fruit {
  constructor(canvas, gridSize, col, w, h) {
    //this.pos = new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
    this.pos = new Vector(0, 0);
    this.chooseLocation(canvas, gridSize);
    this.w = w;
    this.h = h;
    this.col = col;
  }

  display(ctx) {
    ctx.fillStyle = this.col;
    ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
  }

  chooseLocation(canvas, gridSize) {
    let gridsX = canvas.width / gridSize;
    let gridsY = canvas.height / gridSize;
    this.pos = new Vector(
      Math.floor(Math.random() * gridsX * gridSize),
      Math.floor(Math.random() * gridsY * gridSize),
    );
  }
}
