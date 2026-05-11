import { Game } from "./Game.mjs";

function initGame(filePath, endGeneration) {
  const game = new Game(filePath, endGeneration);

  for (let generation = 0; generation < game.endGeneration; generation++) {
    game.tick();
  }

  console.log(game.current());
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
