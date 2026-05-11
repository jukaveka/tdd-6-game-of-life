export class Generation {
  constructor(cells, number) {
    this.cells = cells;
    this.number = number;
  }

  toString() {
    let string = "";
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        string = string.concat(cell.toString());
      });
      string = string.concat("\n");
    });

    return string;
  }

  neighboursAt(cell) {
    let populated = 0;
    for (let row = -1; row < 2; row++) {
      for (let column = -1; column < 2; column++) {
        const neighbourRow = cell.row + row;
        const neighbourColumn = cell.column + column;
        const neighbour = this.cells[neighbourRow][neighbourColumn];
        if (neighbour.populated && !(neighbourRow === cell.row && neighbourColumn === cell.column)) {
          populated++;
        }
      }
    }

    return populated;
  }

  runLengthEncodedHeader() {
    const width = this.cells[0].length;
    const height = this.cells.length;
    return `x = ${width}, y = ${height}\n`;
  }

  runLengthEncodedPattern() {
    let pattern = "";

    this.cells.forEach((row) => {
      const encodedRow = this.rowEncoder(row);
      pattern = pattern.concat(encodedRow);
    });

    pattern = pattern.substring(0, pattern.length - 1).concat("!");

    return pattern;
  }

  rowEncoder(row) {
    let encodedRow = "";
    for (let column = 0; column < row.length; column++) {
      const cell = row[column];
      const tag = cell.tag();
      let count = 1;

      while (column < row.length - 1 && tag === row[column + 1].tag()) {
        count++;
        column++;
      }

      if (count === 1) {
        count = "";
      }
      encodedRow = encodedRow.concat(`${count}${tag}`);
    }

    encodedRow = encodedRow.concat("$");
    return encodedRow;
  }
}
