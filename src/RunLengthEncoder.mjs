import { Cell } from "./Cell.mjs";

export class RunLengthEncoder {
  constructor() {}

  decoder(data) {
    const splitData = data.split("\n");
    const header = splitData[0];
    const content = splitData.toSpliced(0, 1);

    let decoded = new Array();
    for (let row = 0; row < content.length; row++) {
      let decodedRow = new Array()
      for (let column = 0; column < content[0].length; column++) {
        const character = content[row][column];
        if (!isNaN(character) ) {
          const count = Number(character);
          const letter = content[row][column + 1]
          
          console.log(letter);
          decodedRow = decodedRow.concat(letter.repeat(count))
        }
      }

      decoded = decoded.concat(decodedRow);
    }

    let cells = new Array();
    decoded.forEach((row) => {
      let cellRow = new Array();
      const splitRow = row.split("");
      splitRow.forEach((character) => {
        if (character === "o") {
          cellRow = cellRow.concat(new Cell(true));
        } else if (character === "b") {
          cellRow = cellRow.concat(new Cell(false));
        }
      })
      cells = cells.concat(cellRow);
    })

    return cells;
  }
}