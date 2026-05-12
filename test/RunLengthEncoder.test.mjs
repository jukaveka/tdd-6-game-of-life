import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { RunLengthEncoder } from "../src/RunLengthEncoder.mjs";

const blinker = "x = 3, y = 1\n3o!";
const block = "x = 2, y = 2\n2o$2o!";
const glider = "x = 3, y = 3\nbob$2bo$3o!";

describe("Run length encoder", () => {
  let rle;
  beforeEach(() => {
    rle = new RunLengthEncoder();
  })
  test("returns an object", () => {
    expect(rle).to.be.an("object");
  })

  test("decoder returns an array", () => {
    const decoded = rle.decoder(blinker)

    expect(decoded).to.be.an("array");
  })

  test("decoder returns array of Cells", () => {
    const decoded = rle.decoder(blinker)

    expect(decoded[0][0]).to.be.an("object").and.to.have.key("populated");
  })

  test("decoder separates patterns with multiple rows", () => {
    const decoded = rle.decoder(block)

    expect(decoded.length).to.equal(2);
  })

  test("decoder adds singular characters to string", () => {
    const decoded = rle.decoder(glider)

    expect(decoded.length).to.equal(3);
  })
})