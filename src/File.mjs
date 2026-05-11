import { readFile, writeFile } from "node:fs/promises";

export class File {
  constructor(path) {
    this.path = path;
  }

  async read() {
    const data = await readFile(this.path, { encoding: "utf-8" });
    return data;
  }

  async write(content) {
    await writeFile(this.path, content);
  }
}
