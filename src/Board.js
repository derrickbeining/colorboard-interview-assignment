module.exports = class Board {
  constructor(squares = []) {
    this.length = squares.length;
    this.squares = squares;
  }

  indexOf(val, start = 0) {
    return this.squares.indexOf(val, start);
  }
}
