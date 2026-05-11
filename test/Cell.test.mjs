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
})