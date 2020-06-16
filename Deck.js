class Deck {

  constructor(shouldStartFull) {
    this.cards = new Array(0);
    if (shouldStartFull) {
      let suits = ["S", "H", "C", "D"];
      let extra = ["J", "Q", "K"];
      for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        this.cards.push(new Card("A" + suits[suitIndex]));
        for (let value = 2; value <= 10; value++) {
          this.cards.push(new Card(value.toString() + suits[suitIndex]));
        }
        for (let faceCardIndex = 0; faceCardIndex < extra.length; faceCardIndex++) {
          this.cards.push(new Card(extra[faceCardIndex] + suits[suitIndex]));
        }
      }
    }
  }

  shuffle() {
    for (var i = this.cards.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  dealRandomCardTo(otherDeck) {
    this.shuffle();
    otherDeck.cards.push(this.cards.pop());
  }

  addCard(cardToAdd) {
    this.cards.push(cardToAdd);
  }

  removeCard(cardToRemove) {
    for(let i = 0; i < this.cards.length; i++) {
      if(this.cards[i].card == cardToRemove.card) {
        return this.cards.splice(i, 1);
      }
    }
    return "Cannot Remove Card. Card Not Found.";
  }

  print() {
    let toReturn = "[";
    for(let i = 0; i < this.cards.length - 1; i++) {
      toReturn += this.cards[i].print() + ", ";
    }
    return toReturn + this.cards[this.cards.length - 1].print() + "]";
  }

  printShort() {
    let toReturn = "[";
    for(let i = 0; i < this.cards.length - 1; i++) {
      toReturn += this.cards[i].printShort() + ", ";
    }
    return toReturn + this.cards[this.cards.length - 1].printShort() + "]";
  }

}