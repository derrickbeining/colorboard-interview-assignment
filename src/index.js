const pathToInputFile = process.argv.slice(2)[0] || './colorboard.in';
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
