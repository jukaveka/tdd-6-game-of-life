import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Game } from "../src/Game.mjs";

describe("Game", () => {
  let game;

  beforeEach(() => {
    game = Game.initialize("./patterns/testPattern.rle", 5);
  });

  test("returns an object", () => {
    expect(game).to.be.a("object");
  });
});
