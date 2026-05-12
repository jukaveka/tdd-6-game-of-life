import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Game } from "../src/Game.mjs";

describe("Game", () => {
  let game;

  beforeEach(async () => {
    game = await Game.initialize("./patterns/testPattern.rle", 5);
  });

  test("returns an object", () => {
    expect(game).to.be.a("object");
  });

  test("creates first generation based on input file", () => {
    expect(game.generation).to.be.an("object").and.to.have.keys("cells", "number");
  })
});
