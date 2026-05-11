import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Game } from "../src/Game.mjs";

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
