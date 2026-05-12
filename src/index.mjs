import { File } from "./File.mjs";
import { Game } from "./Game.mjs";

async function initGame(filePath, endGeneration) {
  const game = await Game.initialize(filePath, endGeneration);

  for (let generation = 0; generation < game.endGeneration; generation++) {
    game.tick();
  }

  console.log(game.current());
  const file = new File("./patterns/output.rle");
  const header = game.generation.runLengthEncodedHeader();
  const pattern = game.generation.runLengthEncodedPattern();
  const output = header.concat(pattern)
  await file.write(output);
}

function parseArgs(args) {
  if (args.length === 4) {
    const filePath = args[2];
    const endGeneration = args[3];
    return { filePath, endGeneration };
  } else {
    throw new Error("Too many or too few arguments given");
  }
}

const args = parseArgs(process.argv);
initGame(args.filePath, args.endGeneration);
