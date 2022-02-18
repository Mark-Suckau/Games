class Controller {
  constructor() {
    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;
  }

  updateKeys(key) {
    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;

    if (key == 'w') this.up = true;
    if (key == 'a') this.left = true;
    if (key == 's') this.down = true;
    if (key == 'd') this.right = true;
  }
}
