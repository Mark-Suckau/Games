/* eslint-disable no-use-before-define */
//window.onload = () => {
'use strict';

const game = new Game();
const display = new Display(800, 800, game.world.width, game.world.height);
const controller = new Controller();

console.log(
  display.canvas.width,
  display.canvas.height,
  display.canvas.width / display.canvas.height,
  'Display Canvas Before',
);
console.log(
  display.buffer.canvas.width,
  display.buffer.canvas.height,
  display.buffer.canvas.width / display.buffer.canvas.height,
  'Buffer Canvas Before',
);
console.log(
  game.world.width,
  game.world.height,
  game.world.width / game.world.height,
  'Game World Before',
);

// adjusts aspect ratios of game world and buffer canvas to match display canvas size

display.matchAspectRatio(display.buffer.canvas, display.canvas.width, display.canvas.height);
//display.matchAspectRatio(game.world, display.canvas.width, display.canvas.height); // resizes game borders

console.log(''); // one line between

console.log(
  display.canvas.width,
  display.canvas.height,
  display.canvas.width / display.canvas.height,
  'Display Canvas After',
);
console.log(
  display.buffer.canvas.width,
  display.buffer.canvas.height,
  display.buffer.canvas.width / display.buffer.canvas.height,
  'Buffer Canvas After',
);
console.log(
  game.world.width,
  game.world.height,
  game.world.width / game.world.height,
  'Game World After',
);

document.addEventListener(
  'keydown',
  (e) => {
    controller.keyChange(e.key, e.type, controller.gameInput, false);
    controller.keyChange(e.key, e.type, controller.camControls, true);
  },
  false,
);
document.addEventListener(
  'keyup',
  (e) => {
    controller.keyChange(e.key, e.type, controller.gameInput, false);
    controller.keyChange(e.key, e.type, controller.camControls, true);
  },
  false,
);

function update() {
  game.entities.player.applyForce(game.world.gravity);
  // friction applied inside collision methods
  game.entities.player.handleCollisions(game.entities.platforms, game.world);
  game.entities.player.evalCollisions();
  // Movement
  if (controller.gameInput.up.active) game.entities.player.jump();
  if (controller.gameInput.left.active) game.entities.player.move(-1);
  if (controller.gameInput.right.active) game.entities.player.move(1);
  // make player move down when down pressed WIP

  game.entities.player.update();

  //display.camera.followObj(game.entities.player); WARNING TESTING

  if (controller.camControls.up.active) display.camera.moveCam(0, -5);
  if (controller.camControls.left.active) display.camera.moveCam(-5, 0);
  if (controller.camControls.down.active) display.camera.moveCam(0, 5);
  if (controller.camControls.right.active) display.camera.moveCam(5, 0);
  if (controller.camControls.zoomIn.active) display.camera.zoomChange(5);
  if (controller.camControls.zoomOut.active) display.camera.zoomChange(-5);
}

function render() {
  display.background(game.world.backgroundColor, display.backgroundColor);

  display.drawRectTrail(game.entities.player.history);

  // Player
  display.fillRect(
    game.entities.player.pos.x,
    game.entities.player.pos.y,
    game.entities.player.w,
    game.entities.player.h,
    game.entities.player.color.rgba,
  );

  // Platforms
  for (let i = 0; i < game.entities.platforms.length; i++) {
    display.fillRect(
      game.entities.platforms[i].pos.x,
      game.entities.platforms[i].pos.y,
      game.entities.platforms[i].w,
      game.entities.platforms[i].h,
      game.entities.platforms[i].color.rgba,
    );
  }

  display.render();
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
//const engine = new Engine(update, render);
//engine.gameLoop();
//};
