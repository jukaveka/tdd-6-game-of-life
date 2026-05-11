export class Cell {
  constructor(populated) {
    this.populated = populated;
  }

  depopulate() {
    this.populated = false;
  }

  populate() {
    this.populated = true;
  }

  tag() {
    return this.populated ? "o" : "b";
  }

  toString() {
    return this.populated ? "X" : " ";
  }
}
