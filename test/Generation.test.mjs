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
    const neighbours = generation.neighboursAt({row: 2, column: 2});

    expect(neighbours).to.equal(3);
  })

  test("can determine cell neighbours at bottom row", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(false)];
    const row2 = [new Cell(false), new Cell(true), new Cell(true)];
    cells.push(row1, row2);
    const generation = new Generation(cells, number);
    const neighbours = generation.neighboursAt({row: 3, column: 2});

    expect(neighbours).to.equal(2);
  })

  test("can determine cell neighbours at top row", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(false)];
    const row2 = [new Cell(false), new Cell(true), new Cell(true)];
    cells.push(row1, row2);
    const generation = new Generation(cells, number);
    const neighbours = generation.neighboursAt({row: 0, column: 2});

    expect(neighbours).to.equal(2);
  })

  test("can determine cell neighbours at leftmost column", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(false)];
    const row2 = [new Cell(false), new Cell(true), new Cell(true)];
    cells.push(row1, row2);
    const generation = new Generation(cells, number);
    const neighbours = generation.neighboursAt({row: 2, column: 0});

    expect(neighbours).to.equal(1);
  })

  test("can determine cell neighbours at rightmost column", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(false)];
    const row2 = [new Cell(false), new Cell(true), new Cell(true)];
    cells.push(row1, row2);
    const generation = new Generation(cells, number);
    const neighbours = generation.neighboursAt({row: 1, column: 4});

    expect(neighbours).to.equal(1);
  })

  test("can generate new Generation object for next generation", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(false)];
    const row2 = [new Cell(false), new Cell(true), new Cell(true)];
    cells.push(row1, row2);
    const generation = new Generation(cells, number);
    const next = generation.next();

    expect(next).to.be.an("object").and.to.have.keys("cells", "number");
  })

  // Jotting down thoughts for myself, ignore

  // 1. Determine "frame" for current generation (dead cells around the borders of generation).
  // 2. Determine if any cell of the framed cells will repopulate.
  // 3. Keep, depopulate and repopulate cells based on the rules.
  // 4. Determine boundaries of next generation
  // 5. Remove cells outside of the boundaries
  // 6. Create new Generation with cells and number + 1.

  test("frame adds two rows to cells", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(false)];
    const row2 = [new Cell(false), new Cell(true), new Cell(true)];
    cells.push(row1, row2);
    const generation = new Generation(cells, number);

    expect(generation.frame()).to.have.length(4);
  })

  test("frame adds two columns to cells", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(false)];
    const row2 = [new Cell(false), new Cell(true), new Cell(true)];
    cells.push(row1, row2);
    const generation = new Generation(cells, number);

    expect(generation.frame()[0]).to.have.length(5);
  })

  test("generates correct shape for 3x3 all-populated pattern", () => {
    const row1 = [new Cell(true), new Cell(true), new Cell(true)];
    const row2 = [new Cell(true), new Cell(true), new Cell(true)];
    const row3 = [new Cell(true), new Cell(true), new Cell(true)];
    cells.push(row1, row2, row3);
    const generation = new Generation(cells, number);
    const next = generation.next();

    expect(next.toString()).to.have.equal(" XXX \nXX XX\nX   X\nXX XX\n XXX \n");
  })
});
