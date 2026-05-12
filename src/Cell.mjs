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

  nextCell(neighbours) {
    let populated;
    if (neighbours === 2 || neighbours === 3) {
      populated = true;
    } else {
      populated = false;
    }
    return new Cell(populated);
  }
}
