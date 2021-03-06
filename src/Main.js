const fs = require('fs');
const Game = require('./Game');
const stdout = process.stdout;

module.exports = class Main {
  constructor() {
    this.games = [];
  }

  static parseGameInputs(inputText) {
    const allArgs = inputText.split(/\s/g);
    const games = [];
    while (allArgs.length) {
      let game = {};
      game.numPlayers = allArgs.shift();
      game.numSquares = allArgs.shift();
      game.numCards = allArgs.shift();
      game.squares = allArgs.shift();
      game.cards = allArgs.splice(0, game.numCards);
      if (game.numPlayers > 0) games.push(game);
    }
    return games;
  }

  static readInputsFrom(filepath) {
    return new Promise((fulfillWith, rejectWith) => {
      fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) rejectWith(err);
        else fulfillWith(data);
      });
    });
  }

  loadGamesFromFile(pathToFile) {
    return Main.readInputsFrom(pathToFile)
      .then(Main.parseGameInputs)
      .then(inputs => { this.games = inputs.map(Game.create) })
      .catch(err => console.error(err));
  }

  runGames() {
    this.games.forEach(game => game.play());
    return this;
  }

  getResults() {
    const results = [];
    this.games.forEach(game => { results.push(game.result) });
    return results.join('\n');
  }

  printResults() {
    stdout.write(this.getResults());
    return this;
  }

  writeResultsTo(filepath) {
    fs.writeFile(filepath, this.getResults(), (err) => {
      if (err) throw err;
      console.log('\n', filepath, 'was successfully written to disk');
    });
  }
}

