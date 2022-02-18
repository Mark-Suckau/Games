class Button {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.col = {
      r : 0,
      g : 0,
      b : 0,
      a : 255,
    }

    this.isMouseOver = false; //mouseover
    this.isClickDown = false; //mousedown
    this.isClickUp = false; //mouseup
  }
  display() {
    rectMode(CENTER);
    fill(this.col.r, this.col.g, this.col.b, this.col.a);
    stroke(220);
    strokeWeight(4);
    rect(this.x, this.y, this.w, this.h);
  }
  update() {
    if(this.isClickDown) {
      this.col.r = 120;
      this.col.g = 120;
      this.col.b = 120;
      this.col.a = 200;
    } else if (this.isMouseOver) {
      this.col.r = 120;
      this.col.g = 120;
      this.col.b = 120;
      this.col.a = 150;
    } else {
      this.col.r = 70;
      this.col.g = 70;
      this.col.b = 70;
      this.col.a = 100;
    }
  }
  mouseOver() {
    if(mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 &&
       mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2) {
      this.isMouseOver = true;
    } else {
      this.isMouseOver = false;
    }
  }
}
