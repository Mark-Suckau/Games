class Snake {
  constructor(x, y, gridSize) {
    this.pos = new Vector(x, y);
    this.w = gridSize;
    this.h = gridSize;
    this.dir = new Vector(1, 0);
    this.history = [];
    this.length = 3;
    this.dirChanged = false; // to avoid switching direction multiple times before moving
  }

  display(ctx, headCol, tailCol, gridSize) {
    // display head
    ctx.fillStyle = headCol;
    ctx.fillRect(this.pos.x, this.pos.y, gridSize, gridSize);

    // display tail
    ctx.fillStyle = tailCol;
    for (let i = 0; i < this.history.length; i++) {
      ctx.fillRect(this.history[i].x, this.history[i].y, gridSize, gridSize);
    }
  }

  changeDir(dirX, dirY) {
    if (!this.dirChanged && this.dir.x == 0 && dirY == 0 && (dirX > 0 || dirX < 0)) {
      this.dir.x = dirX;
      this.dir.y = dirY;
      this.dirChanged = true;
    }
    if (!this.dirChanged && this.dir.y == 0 && dirX == 0 && (dirY > 0 || dirY < 0)) {
      this.dir.y = dirY;
      this.dir.x = dirX;
      this.dirChanged = true;
    }
  }

  move(gridSize, frameCount) {
    if (frameCount % 40 == 0) {
      this.keepHistory();
      this.pos.x += this.dir.x * gridSize;
      this.pos.y += this.dir.y * gridSize;
      this.dirChanged = false;
    }
  }

  keepHistory() {
    // create copies instead of references
    this.history.unshift(JSON.parse(JSON.stringify(this.pos)));
    if (this.history.length >= this.length) this.history.pop();
  }

  collideTrail(canvas) {
    for (let i = 0; i < this.history.length; i++) {
      if (this.pos.x == this.history[i].x && this.pos.y == this.history[i].y) {
        this.reset(canvas.width / 2, canvas.height / 2);
      }
    }
  }

  reset(spawnX, spawnY) {
    this.history.splice(0, this.history.length);
    this.length = 3;
    this.pos.x = spawnX;
    this.pos.y = spawnY;
  }

  eatFruit(fruit, canvas, gridSize) {
    if (
      this.pos.x < fruit.pos.x + fruit.w &&
      this.pos.x + this.w > fruit.pos.x &&
      this.pos.y < fruit.pos.y + fruit.h &&
      this.pos.y + this.h > fruit.pos.y
    ) {
      this.length += 20;
      fruit.chooseLocation(canvas, gridSize);
    }
  }
}
