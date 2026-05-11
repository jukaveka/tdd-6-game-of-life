import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Cell } from "../src/Cell.mjs";

describe("Cell", () => {
  test("returns an object", () => {
    const cell = new Cell(true);

    expect(cell).to.be.a("object");
  })

  test("has populated value", () => {
    const cell = new Cell(true);

    expect(cell).to.have.key("populated");
  })

  test("can depopulate", () => {
    const cell = new Cell(true);
    cell.depopulate();

    expect(cell.populated).to.equal(false);
  })

  test("can populate", () => {
    const cell = new Cell(false);
    cell.populate();

    expect(cell.populated).to.equal(true);
  })

  test("can be converted to populated RLE character", () => {
    const cell = new Cell(true);

    expect(cell.tag()).to.equal("o");
  })

  test("can be converted to depopulated RLE character", () => {
    const cell = new Cell(false);

    expect(cell.tag()).to.equal("b");
  })

  test("can be converted to populated string", () => {
    const cell = new Cell(true);

    expect(cell.toString()).to.equal("X");
  })

  test("can be converted to depopulated string", () => {
    const cell = new Cell(false);

    expect(cell.toString()).to.equal(" ");
  })
})