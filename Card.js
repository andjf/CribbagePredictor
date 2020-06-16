class Card {
  
  constructor(c) {
    this.card = c;
    this.position = createVector(0, 0);
    this.dimension = createVector(width / 10, width * 0.15);
    this.theta = 0;
    this.highlightPercent = 0;
    this.isHighlighted = false;
  }

  //Returns an integer amount that represents how much the card 
  //is worth according to the rules of Cribbage
  value() {
    let valueLiteral = this.card.substring(0, this.card.length == 2 ? 1 : 2);
    if (valueLiteral.toLowerCase().charAt(0) == "a") {
      return 1;
    }
    if (isNaN(valueLiteral)) {
      return 10;
    }
    return parseInt(valueLiteral);
  }

  rawValue() {
    if(this.value() < 10) {
      return this.value();
    }
    switch(this.valueName().toLowerCase()) {
      case "jack":
        return 11;
      case "queen":
        return 12;
      case "king":
        return 13;
      default:
        return 10;
    }
  }

  //Returns a String that represents the name of the card in English
  valueName() {
    if (this.value() > 1 && this.value() < 10) {
      return this.value().toString();
    }
    switch (this.card.toLowerCase().substring(0, this.card.length == 2 ? 1 : 2)) {
      case "a":
        return "Ace";
      case "j":
        return "Jack"
      case "q":
        return "Queen";
      case "k":
        return "King";
      case "1":
        return "Ace";
      case "10":
        return "10";
      default:
        return "Something went wrong..."
    }
  }

  valueNameShort() {
    if(isNaN(this.valueName())) {
      return this.valueName().charAt(0);
    }
    return this.valueName();
  }

  //Returns a String that represents the suit of the card in English
  suit() {
    switch(this.card.toLowerCase().substring(this.card.length == 2 ? 1 : 2)) {
      case "s":
        return "Spades";
      case "h":
        return "Hearts";
      case "d":
        return "Diamonds";
      case "c":
        return "Clubs";
      default:
        return "Something went wrong..."
    }
  }

  suitShort() {
    switch(this.card.toLowerCase().substring(this.card.length == 2 ? 1 : 2)) {
      case "s":
        return "♠";
      case "h":
        return "♥";
      case "d":
        return "♦";
      case "c":
        return "♣";
      default:
        return "Something went wrong..."
    }
  }

  //Returns a String that represents the card in English
  print() {
     return this.valueName() + " of " + this.suit(); 
  }

  printShort() {
    return this.valueName() + this.suitShort();
  }

  update(basicY, amountMove) {
    if(!this.isHighlighted) {
      if(this.mouseIsOverCard()) {
        this.highlightPercent += (1 - this.highlightPercent) * 0.1;
      } else {
        this.highlightPercent -= (this.highlightPercent) * 0.1;
      }
      //I don't think you need this next line, but I put it in as a safeguard
      this.highlightPercent = constrain(this.highlightPercent, 0, 1);
    } else {
      this.highlightPercent += (1 - this.highlightPercent) * 0.1;
    }
    this.position.y = basicY - this.highlightPercent * amountMove;
  }

  updatePurelyHighlight(basicY, amountMove) {
    if(this.isHighlighted) {
      this.highlightPercent += (1 - this.highlightPercent) * 0.1;
    } else {
      this.highlightPercent -= (this.highlightPercent) * 0.1;
    }
    //I don't think you need this next line, but I put it in as a safeguard
    this.highlightPercent = constrain(this.highlightPercent, 0, 1);
    this.position.y = basicY - this.highlightPercent * amountMove;
  }

  mouseIsOverCard() {
    if (mouseX >= this.position.x - this.dimension.x / 2 && mouseX <= this.position.x + this.dimension.x / 2) {
      if (mouseY >= this.position.y - this.dimension.y / 2 && mouseY <= this.position.y + this.dimension.y / 2) {
        return true;
      }
    }
    return false;
  }

  show() {
    noStroke();
    fill(255);
    rectMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.theta);
    rect(0, 0, this.dimension.x, this.dimension.y, this.dimension.x / 12);
    fill(color(int((this.suitShort() == "♥" || this.suitShort() == "♦")) * 255, 0, 0));
    textAlign(CENTER, CENTER);
    textSize(this.dimension.x / 2);
    text(this.suitShort(), 0, 0);
    fill(0);
    textAlign(LEFT, TOP);
    textSize(this.dimension.x / 4);
    text(this.valueNameShort(), -this.dimension.x / 2 + this.dimension.x / 20, -this.dimension.y / 2 + this.dimension.x / 20);
    rotate(180);
    text(this.valueNameShort(), -this.dimension.x / 2 + this.dimension.x / 20, -this.dimension.y / 2 + this.dimension.x / 20);
    pop();
  }
  
  
}