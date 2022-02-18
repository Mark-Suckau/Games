class Engine {
  constructor(update, render) {
    this.update = update;
    this.render = render;
  }
  gameLoop() {
    this.update;
    this.render;
    requestAnimationFrame(this.gameLoop);
  }
}
