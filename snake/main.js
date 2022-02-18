window.onload = function () {
  let canvas = document.createElement('canvas');
  canvas.height = 500;
  canvas.width = 500;
  document.body.appendChild(canvas);

  let context = canvas.getContext('2d');

  let frameCount = 0;
  let GRIDSIZE = 20;
  let controller = new Controller();
  document.addEventListener('keydown', (e) => controller.updateKeys(e.key));
  let snake = new Snake(canvas.width / 2, canvas.height / 2, GRIDSIZE);

  let fruit = new Fruit(canvas, GRIDSIZE, 'red', 10, 10);
  function update() {
    frameCount++;
    // Background
    context.fillStyle = 'rgb(50, 50, 50)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Snake
    snake.display(context, 'red', 'black', GRIDSIZE);
    if (controller.up) snake.changeDir(0, -1);
    if (controller.left) snake.changeDir(-1, 0);
    if (controller.down) snake.changeDir(0, 1);
    if (controller.right) snake.changeDir(1, 0);
    snake.move(GRIDSIZE, frameCount);
    snake.collideTrail(canvas);

    snake.eatFruit(fruit, canvas, GRIDSIZE);

    fruit.display(context);

    requestAnimationFrame(update);
  }
  update();
};
