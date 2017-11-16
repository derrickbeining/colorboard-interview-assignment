class Deck {
  constructor(cards = []) {
    this.cardCount = cards.length;
    this.cards = cards;
    this.drawnCards = [];
  }

  draw() {
    const drawnCard = this.cards.shift();
    this.drawnCards.push(drawnCard);
    return drawnCard;
  }
}

module.exports = Deck;
