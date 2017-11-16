const pathToInputFile = process.argv.slice(2)[0] || './colorboard.in';
const ColorBoard = require('./ColorBoard');

const program = new ColorBoard;
program.loadGamesFromFile(pathToInputFile)
  .then(() => {
    program.runGames()
    .printResults()
    .writeResultsTo('./colorboard.out');
  })
  .catch(err => console.error(err));
