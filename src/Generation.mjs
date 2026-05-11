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
      })
      string = string.concat("\n");
    })

    return string;
  }

  runLengthEncodedHeader() {
    const width = this.cells[0].length;
    const height = this.cells.length;
    return `x = ${width}, y = ${height}\n`;
  }

  rowEncoder(row) {
    let encodedRow = "";

    for(let column = 0; column < row.length; column++) {
      const cell = row[column]
      const tag = cell.tag()

      let count = 1;
      while(column < row.length - 1 && tag === row[column + 1].tag()) {
        count++
        column++
      }

      if (count === 1) {
        count = ""
      }

      encodedRow = encodedRow.concat(`${count}${tag}`)
    }

    encodedRow = encodedRow.concat("$");

    return encodedRow;
  }
}