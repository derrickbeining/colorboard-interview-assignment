const fs = require('fs');
const {resolve} = require('path');
const log = console.log.bind(console);
const inputFile = 'colorboard.in';
const outputFile = 'colorboard.out';

const readFile = filepath => (new Promise((fulfillWith, rejectWith) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) rejectWith(err);
    else fulfillWith(data);
  });
}));

const parseToGameData = gameInputText => {
  const allArgs = gameInputText.split(/\s/g);
  const games = [];
  while (allArgs.length) {
    const game = {};
    game.numPlayers = allArgs.shift();
    game.numSquares = allArgs.shift();
    game.numCards = allArgs.shift();
    game.squares = allArgs.shift();
    game.cards = allArgs.splice(0, game.numCards);
    if (game.numPlayers > 0) games.push(game);
  }
  return games;
}

const calculateResults = games => games.map(calculateResult);

const calculateResult = game => {
  const {cards, numPlayers, squares, numSquares, numCards} = game;
  const playerPositions = [];
  for (let idx = 0; idx < cards.length; idx++) {
    const playerUp = idx % numPlayers;
    const position = playerPositions[playerUp];
    const newPosition = calcNewPosition(position, cards[idx], squares);
    playerPositions[playerUp] = newPosition;
    if (isFinalSquare(newPosition, numSquares)) {
      return stateTheResult(playerUp + 1, idx + 1);
    }
  }
  return stateTheResult(0, numCards);
}

const calcNewPosition = (currPosition, card, squares) => {
  const colors = card.split('');
  return colors.reduce((position, color) => {
    if (position >= 0) return squares.indexOf(color, position + 1);
    else return squares.indexOf(color);
  }, currPosition);
}

const isFinalSquare = (position, numSquares) => {
  return (position === numSquares - 1 || position === -1);
}

const stateTheResult = (playerNum, numCardsDrawn) => {
  const whoWon = playerNum > 0 ? `Player ${playerNum}` : 'No player';
  return `${whoWon} won after ${numCardsDrawn} cards.`;
}

const formatResults = results => {
  return results.join('\n');
}

const writeToFile = (filepath, content) => {
  return new Promise((fulfillWith, rejectWith) => {
    fs.writeFile(filepath, content, (err) => {
      if (err) rejectWith(err);
      else fulfillWith(content);
    });
  })
}

const writeOutput = writeToFile.bind(null, resolve(__dirname, outputFile));

const asyncPiper = (prev, curr) => (...args) => prev(...args).then(curr);
const asyncPipe = (...fns) => fns.reduce(asyncPiper);

const runProgram = asyncPipe(
  readFile,
  parseToGameData,
  calculateResults,
  formatResults,
  writeOutput,
  log
);

runProgram(resolve(process.env.PWD, inputFile))
  .catch(err => console.error(err))

