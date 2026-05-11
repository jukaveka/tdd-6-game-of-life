import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Generation } from "../src/Generation.mjs";
import { Cell } from "../src/Cell.mjs";

// 1. Returns an object
// 2. Has array of cells
// 3. Has width and height
// 4. Has number of generation
// X. Can be converted to string
// X. Can be converted to RLE
// X. Can determine neighbours of a cell
// X. Can generate an array of next generation cells
// X

describe("Generation", () => {
  let cells;
  let number;
  beforeEach(() => {
    cells = new Array();
    number = 0;
  });
  test("returns an object", () => {
    const generation = new Generation();

    expect(generation).to.be.a("object");
  });

  test("has array of cells", () => {
    const generation = new Generation(cells, number);

    expect(generation.cells).to.be.a("array");
  });

  test("has integer number", () => {
    const generation = new Generation(cells, number);

    expect(generation.number).to.be.a("number");
  });

  test("can be converted to string", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(false)];
    const row2 = [new Cell(false), new Cell(true), new Cell(true)];
    cells.push(row1, row2);
    const generation = new Generation(cells, number);

    expect(generation.toString()).to.equal("XX \n XX\n");
  });

  test("can determine RLE header", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(false)];
    const row2 = [new Cell(false), new Cell(true), new Cell(true)];
    cells.push(row1, row2);
    const generation = new Generation(cells, number);

    expect(generation.runLengthEncodedHeader()).to.equal("x = 3, y = 2\n");
  });

  test("can encode row of cells", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(true), new Cell(false), new Cell(false), new Cell(true)];
    cells.push(row1);
    const generation = new Generation(cells, number);
    const encodedRow = generation.rowEncoder(row1);

    expect(encodedRow).to.equal("3o2bo$");
  });

  test("can generate RLE pattern", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(false)];
    const row2 = [new Cell(false), new Cell(true), new Cell(true)];
    cells.push(row1, row2);
    const generation = new Generation(cells, number);

    expect(generation.runLengthEncodedPattern()).to.equal("2ob$b2o!");
  });

  test("can determine cell neighbours count", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(false)];
    const row2 = [new Cell(false), new Cell(true), new Cell(true)];
    const row3 = [new Cell(false), new Cell(false), new Cell(false)];
    cells.push(row1, row2, row3);
    const generation = new Generation(cells, number);
    const neighbours = generation.neighboursAt({row: 1, column: 1});

    expect(neighbours).to.equal(3);
  })
});
