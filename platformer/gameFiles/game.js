class Game {
  constructor() {
    this.world = new Game.World(1600, 1600, 'rgba(7, 18, 17, 1)');
    this.entities = {
      player: new Game.Player(400, 0, 50, 50, 44, 133, 124, 1),
      platforms: [
        new Game.Platform(270, 600, 200, 100, 44, 133, 124, 1, 5),
        new Game.Platform(600, 900, 200, 100, 44, 133, 124, 1, 5),
        new Game.Platform(50, 900, 300, 100, 44, 133, 124, 1, 5),
      ],
    };
  }
}
