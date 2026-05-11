import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { File } from "../src/File.mjs";

describe("File", () => {
  let file;
  const filePath = "./patterns/testPattern.rle";

  beforeEach(() => {
    file = new File(filePath);
  });

  test("returns an object", () => {
    expect(file).to.be.a("object");
  });

  test("stores filePath", () => {
    expect(file.path).to.equal(filePath);
  });

  test("reads data from file", async () => {
    const data = await file.read();
    expect(data).to.equal("x = 3, y = 3\n3o!");
  });

  test("writes data to file", async () => {
    const newFile = new File("./patterns/testOutput.rle");
    await newFile.write("x = 5, y = 3\n3o!");
    const data = await newFile.read();
    expect(data).to.equal("x = 5, y = 3\n3o!");
  });
});
