import { Game } from "./Game.mjs";

function initGame(file, endGeneration) {
  const game = new Game(file, endGeneration);

  for (let generation = 0; generation < game.endGeneration; generation++) {
    game.tick();
  }

  console.log(game.current());
}

function parseArgs(args) {
  if (args.length === 4) {
    const file = args[2];
    const endGeneration = args[3];
    return {file, endGeneration}
  } else {
    throw new Error("Too many or too few arguments given");
  }
}

const args = parseArgs(process.argv);
initGame(args.file, args.endGeneration);