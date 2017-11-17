module.exports = class Player {
  constructor() {
    this.number = null;
    this.position = null;
    this.game = null;
  }

  joinGame(gameInstance) {
    this.game = gameInstance;
    return this;
  }

  setNumber(num) {
    this.number = num;
    return this;
  }

  takeTurn() {
    const squareColors = this.game.deck.draw().split('');
    let idx = 0;
    let start = this.position ? this.position + 1 : 0;
    squareColors.forEach(color => {
      idx = this.game.board.indexOf(color, start);
      start = idx + 1;
    });
    this.moveToPosition(idx);
    if (this.position === this.game.board.length - 1) {
      this.game.setResult(this.number, this.game.deck.drawnCards.length);
    }
  }

  moveToPosition(num) {
    if (num === -1) this.position = this.game.board.length - 1;
    else this.position = num;
    return this;
  }
}
