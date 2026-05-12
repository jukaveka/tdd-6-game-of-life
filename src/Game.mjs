import { File } from "./File.mjs";
import { RunLengthEncoder } from "./RunLengthEncoder.mjs";
import { Generation } from "./Generation.mjs";

export class Game {
  static async initialize(filePath, endGeneration) {
    const file = new File(filePath);
    const data = await file.read();
    const rle = new RunLengthEncoder();
    
    const cells = rle.decoder(data);

    return new Game(cells, endGeneration);
  }

  constructor(cells, endGeneration) {
    this.generation = new Generation(cells, 0);
    this.endGeneration = endGeneration;
  }

  tick() {
    this.generation = this.generation.next();
  }

  current() {
    return this.generation.toString();
  }
}
