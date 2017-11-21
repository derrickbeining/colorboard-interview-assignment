const pathToInputFile = process.argv[2] || './colorboard.in';
const pathToOutputFile = './colorboard.out';
const Main = require('./Main');

const program = new Main;
program.loadGamesFromFile(pathToInputFile)
  .then(() => {
    program.runGames()
    .printResults()
    .writeResultsTo(pathToOutputFile);
  })
  .catch(err => console.error(err));
