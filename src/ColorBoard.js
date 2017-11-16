const fs = require('fs');
const Deck = require('./Deck');
const Board = require('./Board');
const Player = require('./Player');
const Game = require('./Game');

const stdout = process.stdout;

module.exports = class ColorBoard {
  constructor() {
    this.games = [];
  }

  static readInputsFrom(filepath = process.argv.slice(2)[0]) {
    return new Promise((fulfillWith, rejectWith) => {
      fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) rejectWith(err);
        else fulfillWith(data);
      });
    });
  }

  static parseInputsToGameData(inputText) {
    const allArgs = inputText.split(/\s/g);
    const games = [];
    while (allArgs.length) {
      let game = {};
      game.numPlayers = allArgs.shift();
      game.numSquares = allArgs.shift();
      game.numCards = allArgs.shift();
      game.squares = allArgs.shift().split('');
      game.cards = allArgs.splice(0, game.numCards);
      if (game.numPlayers > 0) games.push(game);
    }
    return games;
  }

  static createGameFromData(data) {
    const players = [];
    const deck = new Deck(data.cards);
    const board = new Board(data.squares);
    while (players.length < data.numPlayers) players.push(new Player);
    return new Game(players, deck, board)
  }

  loadGamesFromFile(pathToFile) {
    return ColorBoard.readInputsFrom(pathToFile)
      .then(ColorBoard.parseInputsToGameData)
      .then(data => { this.games = data.map(ColorBoard.createGameFromData) })
      .catch(err => console.error(err));
  }

  runGames() {
    this.games.forEach(game => game.play());
    return this;
  }

  getResults() {
    const results = [];
    this.games.forEach(game => { results.push(`${game.result}\n`) });
    return results.join('');
  }

  printResults() {
    stdout.write(this.getResults());
    return this;
  }

  writeResultsTo(filepath) {
    fs.writeFile(filepath, this.getResults(), (err) => {
      if (err) throw err;
      console.log(filepath, 'was successfully written to disk');
    });
  }
}

