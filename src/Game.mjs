export class Game {
  static initialize(filePath, endGeneration) {
    return new Game(filePath, endGeneration);
  }

  constructor(filePath, endGeneration) {
    this.pattern = filePath;
    this.endGeneration = endGeneration;
    this.currentGeneration = 0;
  }

  tick() {
    this.currentGeneration = this.currentGeneration + 1;
  }

  current() {
    return this.pattern;
  }
}
