import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { sum } from "../src/example.mjs";
import { Game } from "../src/Game.mjs";

// Jotting down things I'd like to test with the skeleton
// 1. Returns an object
// 2. Takes file input
// 3. Takes generation integer
// 4. Tick increases generation
// 5. Outputs same file that was input (a string or new file?)

describe("Walking skeleton", () => {
  let game;

  beforeEach(() => {
    game = new Game("./testinput.txt", 5);
  });

  test("Returns an Game object", () => {
    expect(game).to.be.a("object");
  });

  test("Takes file as input", () => {
    expect(game.pattern).to.equal("./testinput.txt");
  });

  test("Takes generation as input", () => {
    expect(game.endGeneration).to.equal(5);
  });

  test("Start at generation 0", () => {
    expect(game.currentGeneration).to.equal(0);
  });

  test("Tick increases current generation", () => {
    game.tick();
    expect(game.currentGeneration).to.equal(1);
  });

  test("current returns current pattern", () => {
    expect(game.current()).to.equal("./testinput.txt");
  });
});
