const Deck = require('./Deck');
const Board = require('./Board');

module.exports = class Game {
  constructor(players = [], deck = new Deck(), board = new Board()) {
    this.players = players;
    this.deck = deck;
    this.board = board;
    this.playerUp = 0;
    this.result = null;
    this.players.forEach((player, idx) => {
      player.setNumber(idx + 1).joinGame(this);
    });
  }

  setResult(playerNum, numCardsDrawn) {
    const whoWon = playerNum > 0 ? `Player ${playerNum}` : 'No player';
    this.result = `${whoWon} won after ${numCardsDrawn} cards.`;
    return this;
  }

  play() {
    while (this.result === null) {
      if (this.deck.cards.length) {
        this.players[this.playerUp].takeTurn();
        this.nextTurn();
      } else {
        return this.setResult(0, this.deck.cardCount);
      }
    }
    return this;
  }

  nextTurn() {
    this.playerUp = (this.playerUp + 1) % this.players.length;
  }
}
