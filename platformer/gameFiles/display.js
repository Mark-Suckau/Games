class Display {
  constructor(canvasWidth, canvasHeight, gameWorldWidth, gameWorldHeight) {
    this.canvas = document.createElement('canvas');
    this.canvas.height = canvasHeight;
    this.canvas.width = canvasWidth;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d'); // display canvas
    this.backgroundColor = 'black'; // background for display canvas
    this.aspectRatioWidth = this.canvas.height / this.canvas.width;
    this.aspectRatioHeight = this.canvas.width / this.canvas.height;

    this.buffer = document.createElement('canvas').getContext('2d'); // game canvas
    this.buffer.canvas.width = gameWorldWidth;
    this.buffer.canvas.height = gameWorldHeight; // WARNING TESTING

    this.camera = new Display.Camera(0, 0, 0);
  }

  fillRect(x, y, w, h, color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(x, y, w, h);
  }

  drawRectTrail(history) {
    // Draws every object in the history array as rectangles
    for (let i = 0; i < history.length; i++) {
      this.fillRect(history[i].x, history[i].y, history[i].w, history[i].h, history[i].color.rgba);
    }
  }

  background(gameBackgroundColor, canvasBackgroundColor) {
    //ADD BACKGROUND TO ANYTHING OUTSIDE OF GAME WORLD // WARNING TEST

    /*required to fill directly to canvas aswell as buffer to avoid glitching with objects on edge
    of buffer canvas since the canvas wouldnt receive any updates the color stays on the main canvas*/
    this.buffer.fillStyle = gameBackgroundColor;
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);

    this.ctx.fillStyle = canvasBackgroundColor;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  render() {
    // WARNING TESTING
    this.ctx.drawImage(
      this.buffer.canvas,
      this.camera.view.x + this.camera.offset.x + this.camera.zoom / 2, // to zoom towards top left corner remove this + zoom
      this.camera.view.y + this.camera.offset.y + this.camera.zoom / 2, // to zoom towards top left corner remove this + zoom
      //0,
      //0,
      this.buffer.canvas.width - this.camera.zoom,
      this.buffer.canvas.height - this.camera.zoom,
      //this.buffer.canvas.width,
      //this.buffer.canvas.height,
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height,
    );
  }

  matchAspectRatio(canvas, aspectWidth, aspectHeight) {
    // target aspect ratio
    let targetAspectRatio = aspectWidth / aspectHeight;
    let targetAspectRatioHeight = aspectHeight / aspectWidth;

    if (canvas.width > canvas.height) {
      if (aspectWidth > aspectHeight) {
        canvas.width = canvas.height * targetAspectRatio;
        canvas.height = canvas.width * targetAspectRatioHeight;
      } else if (aspectWidth < aspectHeight) {
        canvas.height = canvas.width * targetAspectRatioHeight;
        canvas.width = canvas.height * targetAspectRatio;
      } else {
        canvas.width = canvas.height * targetAspectRatio;
        canvas.height = canvas.width * targetAspectRatioHeight;
      }
    } else if (canvas.height > canvas.width) {
      if (aspectWidth > aspectHeight) {
        canvas.width = canvas.height * targetAspectRatio;
        canvas.height = canvas.width * targetAspectRatioHeight;
      } else if (aspectWidth < aspectHeight) {
        canvas.height = canvas.width * targetAspectRatioHeight;
        canvas.width = canvas.height * targetAspectRatio;
      } else {
        canvas.width = canvas.height * targetAspectRatio;
        canvas.height = canvas.width * targetAspectRatioHeight;
      }
    } else if (canvas.width == canvas.height) {
      console.log('a');
      if (aspectWidth > aspectHeight) {
        canvas.width = canvas.height * targetAspectRatio;
        canvas.height = canvas.width * targetAspectRatioHeight;
      } else if (aspectWidth < aspectHeight) {
        canvas.height = canvas.width * targetAspectRatioHeight;
        canvas.width = canvas.height * targetAspectRatio;
      } else {
        canvas.width = canvas.height * targetAspectRatio;
        canvas.height = canvas.width * targetAspectRatioHeight;
      }
    } else {
      console.log('Error in Aspect Ratio matching, couldnt fullfill any if conditions');
    }
  }

  matchAspectRatio2(canvas, aspectWidth, aspectHeight) {
    let ratio = Math.min(aspectWidth / canvas.width, aspectHeight / canvas.height);
    canvas.width *= ratio;
    canvas.height *= ratio;
  }
}

Display.Camera = class {
  constructor(viewX = 0, viewY = 0, zoom = 0) {
    // viewY positive -> view moves down, positive -> view moves up
    // viewX positive -> view moves right, negative -> view moves left
    this.view = new Vector(viewX, viewY);
    this.offset = new Vector(viewX, viewY); /* used to offset follow cam */

    this.zoom = zoom; /* zoom in px (zooms in that amount on all sides) */
  }

  followObj(obj) {
    this.view.x = obj.pos.x + obj.w / 2; // + this.offset.x TESTING
    this.view.y = obj.pos.y + obj.h / 2; // + this.offset.y TESTING
  }

  moveCam(changeX, changeY) {
    this.offset.x += changeX;
    this.offset.y += changeY;
  }

  zoomChange(zoom) {
    this.zoom += zoom;
  }
};
