import { Cell } from "./Cell.mjs";

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
    let rows = [cell.row - 1, cell.row, cell.row + 1].filter((number) => number >= 0);
    let columns = [cell.column - 1, cell.column, cell.column + 1]
      .filter((number) => number >= 0)
      .filter((number) => number < this.cells[0].length);

    for (let row = 0; row < rows.length; row++) {
      for (let column = 0; column < columns.length; column++) {
        const targetRow = rows[row];
        const targetColumn = columns[column];
        const neighbourRow = this.cells[targetRow];
        if (neighbourRow) {
          const neighbour = neighbourRow[targetColumn];
          if (neighbour.populated && !(targetRow === cell.row && targetColumn === cell.column)) {
            populated++;
          }
        }
      }
    }

    return populated;
  }

  frame() {
    const width = this.cells[0].length
    let depopulatedRow = new Array();

    for (let column = 0; column < width; column++) {
      depopulatedRow = depopulatedRow.concat(new Cell(false))
    }

    const framedCells = this.cells
      .toSpliced(0, 0, depopulatedRow)
      .concat([depopulatedRow])
      .map((row) => row.toSpliced(0, 0, new Cell(false)))
      .map((row) => row.concat(new Cell(false)));

    return framedCells;
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
