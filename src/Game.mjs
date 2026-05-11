export class Game {
  constructor(file, endGeneration) {
    this.pattern = file;
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
