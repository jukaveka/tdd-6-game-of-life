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

  isPopulated() {
    return this.populated;
  }

  nextCell(neighbours) {
    let populated;

    if (this.isPopulated() && (neighbours === 2 || neighbours === 3) || !this.isPopulated() && neighbours === 3) {
      populated = true;
    } else {
      populated = false;
    }

    return new Cell(populated);
  }
}
