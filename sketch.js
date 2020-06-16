let chosingPlayersButtonGap;
let buttonAlphaPercent;
let numberOfPlayers;
let numberOfCards;
let chosingCards;
let dealCardsStartFrame;
let finalYOfCards;
let confirmButtonAlpha;
let confirmed;
let canConfirm;
let oneIsHighlighted;
let valueSliderCreated;
let valueSlider;
let suitSliderCreated;
let suitSlider;
let frameConfirmed;

let deck;
let hand;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  console.log("Width: " + width + "\nHeight: " + height);
  buttonAlphaPercent = 0;
  numberOfPlayers = 0;
  numberOfCards = 0;
  chosingPlayersButtonGap = height / 75;
  chosingCards = false;
  confirmed = false;
  canConfirm = false;
  oneIsHighlighted = false;
  confirmButtonAlpha = 0;
  dealCardsStartFrame = -1;
  finalYOfCards = -1;
  valueSliderCreated = false;
  suitSliderCreated = false;
  frameConfirmed = -1;
  suitSlider = createSlider(0, 3, 0, 0);
  suitSlider.hide();
  valueSlider = createSlider(1, 13, 1, 0);
  valueSlider.hide();
  deck = new Deck(true);
  hand = new Deck(false);
}

function draw() {
	background(51);
 	if (numberOfPlayers == 0 || buttonAlphaPercent > 0.01) {
  		if(numberOfPlayers == 0 && buttonAlphaPercent < 1) {
      		//This should be evenly divisable by 1
      		buttonAlphaPercent += 0.01;
    	}
    	//IF YOU CHANGE THESE, REMEMBER TO CHANGE THEM IN mousePressed() TOO
		let x = chosingPlayersButtonGap;
    	let y = height / 10;
    	let w = (width / 2) - x * 2;
    	let h = height - y - chosingPlayersButtonGap;
    	let curveRadius = chosingPlayersButtonGap;
    	drawNumberPlayerButton(x, y, w, h, curveRadius, "2");
    	drawNumberPlayerButton(width / 2 + x, y, w, h, curveRadius, "3");
    	textAlign(CENTER, CENTER);
    	let message = "How many players are there?";
    	let textSizeVar = 0;
    	textSize(textSizeVar);
    	while(textWidth(message) < width && textSizeVar < y) {
      		textSizeVar += 0.5;
      		textSize(textSizeVar);
    	}
    	textSize(textSizeVar * 0.8);
    	text(message, width / 2, y / 2);
    	if (numberOfPlayers != 0) {
      		//if decay rate is 0.9, it takes 44 frames
      		//use desmos to graph (0.9)^x > 0.01
      		buttonAlphaPercent *= 0.9;
    	}	
 	} else {
 		if(dealCardsStartFrame == -1) {dealCardsStartFrame = frameCount;}

    	let elapsedFrames = frameCount - dealCardsStartFrame;
    	let framesPerCard = 30;
    	let currentCard = int(elapsedFrames / framesPerCard);
      let amountToRotate = 360;
    	if(currentCard < numberOfCards) {
      		let framesIntoCardAnimation = elapsedFrames % framesPerCard;

      		let w = min(map(framesIntoCardAnimation, 0, (framesPerCard - 1) / 2, 0, width / 10), width / 10);
      		let h = w * 1.5;
      		let allCardsWidth = w * numberOfCards + (w / 2) * (numberOfCards - 1)
      		let x = (currentCard * (3 * w / 2)) + ((width - allCardsWidth) / 2) + w / 2;
      		let amountForCardsToSlide = height - ((h / 2) * 5 / 4);
      		let y = ((-pow(framesIntoCardAnimation - framesPerCard, 2)) / ((pow(framesPerCard, 2)) / (amountForCardsToSlide))) + (amountForCardsToSlide);

          let theta = ((-pow(framesIntoCardAnimation - framesPerCard, 2)) / ((pow(framesPerCard, 2)) / (amountToRotate))) + (amountToRotate);

      		hand.cards[currentCard]['position'] = createVector(x, y);
      		hand.cards[currentCard]['dimension'] = createVector(w, h);
      		hand.cards[currentCard]['theta'] = theta;
      		hand.cards[currentCard].show();

      		for(let i = currentCard - 1; i >= 0; i--) {
      			if(finalYOfCards == -1) {
      				finalYOfCards = hand.cards[i].position.y;
      			}
        		hand.cards[i].show();
      		}
	    } else {
	    	canConfirm = true;
	    	if(!confirmed) {
		      	for(let i = 0; i < numberOfCards; i++) {
		        	hand.cards[i].show();
		        	hand.cards[i].update(finalYOfCards, width / 20);
		      	}
		      	rectMode(CORNER);
		      	strokeWeight(height / 50);
		      	stroke(255, max(confirmButtonAlpha, 200));
		      	fill(255, confirmButtonAlpha);
		      	confirmButtonAlpha = constrain((confirmButtonAlpha + 10) - 20 * int(mouseIsInRectangle(chosingPlayersButtonGap * 4, chosingPlayersButtonGap * 4, width - chosingPlayersButtonGap * 8, height / 5)), 0, 255);
		      	rect(chosingPlayersButtonGap * 4, chosingPlayersButtonGap * 4, width - chosingPlayersButtonGap * 8, height / 5, width / 40);
		      	textAlign(CENTER, CENTER);
		      	noStroke();
		      	textSize(height / 8);
		      	fill(255 - confirmButtonAlpha);
		      	text("Confirm Cards", width / 2, chosingPlayersButtonGap * 4 + (height / 5) / 2);

		      	if(oneIsHighlighted) {
		      		let highlightedCard;
		      		for(let i = 0; i < hand.cards.length; i++) {
		      			if(hand.cards[i].isHighlighted) {
		      				highlightedCard = hand.cards[i];
		      				break;
		      			}
		      		}
		      		if(!valueSliderCreated) {
			      		valueSlider = createSlider(1, 13, highlightedCard.rawValue(), 0);
			      		valueSlider.show();
			      		valueSlider.position(chosingPlayersButtonGap * 4, chosingPlayersButtonGap * 4 + (height / 4));
			      		valueSlider.style("width", (width - chosingPlayersButtonGap * 8).toString() + "px");
			      		valueSliderCreated = true;
			      	} else {
			      		let valueAsString;
			      		switch(int(valueSlider.value())) {
			      			case 11:
			      				valueAsString = "J";
			      				break;
			      			case 12:
			      				valueAsString = "Q";
			      				break;
			      			case 13:
			      				valueAsString = "K";
			      				break;
			      			default:
			      				valueAsString = int(valueSlider.value()).toString();
			      		}
			      		highlightedCard.card =  valueAsString + highlightedCard.suit().charAt(0);
			      	}

			      	let suits = ["S", "H", "C", "D"];
			      	if(!suitSliderCreated) {
			      		suitSlider = createSlider(0, 3, suits.indexOf(highlightedCard.suit().charAt(0)), 0);
			      		suitSlider.show();
			      		suitSlider.position(chosingPlayersButtonGap * 4, chosingPlayersButtonGap * 8 + (height / 4));
			      		suitSlider.style("width", (width - chosingPlayersButtonGap * 8).toString() + "px");
			      		suitSliderCreated = true;
			      	} else {
			      		highlightedCard.card = highlightedCard.card.substring(0, highlightedCard.card.length == 3 ? (2) : (1)) + suits[int(suitSlider.value() + 0.5)];
			      	}

              suits = ["♠", "♥", "♣", "♦"];
              stroke(255);
              strokeWeight(height / 120);
              textAlign(CENTER, TOP);
              for(let i = 0; i < suits.length; i++) {
                fill(color(int(i % 2 != 0) * 255, 0, 0));
                textSize(height / 10);
                text(suits[i], map(i, 0, suits.length - 1, chosingPlayersButtonGap * 4 + textWidth(suits[0]) / 2, chosingPlayersButtonGap * 4 + (width - chosingPlayersButtonGap * 8) - textWidth(suits[0]) / 2), chosingPlayersButtonGap * 8 + (height / 4) + 50);
              }
			      }
	      	} else {

	      		let framesSinceConfirmation = frameCount - frameConfirmed;
	      		let transitionDuration = 60;

	      		for(let i = 0; i < numberOfCards; i++) {
	      			hand.cards[i].show();
	      		}

	      		if(framesSinceConfirmation <= transitionDuration) {
	      			for(let i = 0; i < numberOfCards; i++) {
			        	let s = finalYOfCards;
			        	let e = height / 2;
			        	let yThing = (((s - e) / (2)) * (cos((framesSinceConfirmation) / ((transitionDuration) / (180))))) + ((s + e) / (2));
			        	hand.cards[i].updatePurelyHighlight(yThing, width / 20);
			      	}
            }
          }
        }
      }
}

function mouseClicked() {
	if(canConfirm && !confirmed) {
		if(mouseIsInRectangle(chosingPlayersButtonGap * 4, chosingPlayersButtonGap * 4, width - chosingPlayersButtonGap * 8, height / 5, width / 40)) {
			confirmed = true;
			canConfirm = false;
			frameConfirmed = frameCount;
			suitSlider.hide();
      valueSlider.hide();

      let bestDiscardsArray = HandDecider.bestDiscards(hand);
      //the stuff should be done here
      for(let i = 0; i < numberOfCards; i++) {
      	hand.cards[i].isHighlighted = false;
      }
      for(let i = 0; i < bestDiscardsArray.length; i++) {
        hand.cards[bestDiscardsArray[i]].isHighlighted = true;
      }
		}
	} else {
    confirmed = false;
    canConfirm = true;
    suitSlider.show();
    valueSlider.show();
    valueSlider.value(hand.cards[0].rawValue());
    let suits = ["S", "H", "C", "D"];
    suitSlider.value(suits.indexOf(hand.cards[0].suit().toUpperCase().charAt(0)));
    for(let i = 0; i < hand.cards.length; i++) {
      hand.cards[i].isHighlighted = i == 0;
    }
  } 
}

function mousePressed() {
 	if (numberOfPlayers == 0) {
	    let x = chosingPlayersButtonGap;
	    let y = height / 10;
	    let w = (width / 2) - x * 2;
	    let h = height - y - chosingPlayersButtonGap;
	    let aButtonHasBeenPressed = false;
	    if (mouseIsInRectangle(x, y, w, h)) {
	      numberOfPlayers = 2;
	      aButtonHasBeenPressed = true;
	    }
	    if (mouseIsInRectangle(width / 2 + x, y, w, h)) {
	      numberOfPlayers = 3;
	      aButtonHasBeenPressed = true;
	    }
	    if(aButtonHasBeenPressed) {
	      numberOfCards = numberOfPlayers == 3 ? 5 : 6;
	      console.log("\nPlayers: " + numberOfPlayers);
	      console.log("Each Player Gets " + numberOfCards + " Cards\n");
	      for(let i = 0; i < numberOfCards; i++) {
	        deck.dealRandomCardTo(hand);
	      }
	    }
 	} else {
 		oneIsHighlighted = false;
 		for(let i = 0; i < hand.cards.length; i++) {
 			if(hand.cards[i].mouseIsOverCard()) {
 				hand.cards[i].isHighlighted = true;
        valueSlider.value(hand.cards[i].rawValue());
        let suits = ["S", "H", "C", "D"];
        suitSlider.value(suits.indexOf(hand.cards[i].suit().toUpperCase().charAt(0)));
 			} else {
 				let clickedOnOne = false;
 				for(let j = 0; j < hand.cards.length; j++) {
 					if(hand.cards[j].mouseIsOverCard()) {
 						clickedOnOne = true;
 						break;
 					}
 				}
 				hand.cards[i].isHighlighted = !clickedOnOne && hand.cards[i].isHighlighted;
 			}
 			if(hand.cards[i].isHighlighted) {
 				oneIsHighlighted = true;
 			}
 		}
  	}
}

function drawNumberPlayerButton(x, y, w, h, gap, label) {
	noFill();
	stroke(255, buttonAlphaPercent * 255);
	strokeWeight(buttonAlphaPercent * (height / 200));
	if (mouseIsInRectangle(x, y, w, h, gap)) {
		let distanceX = abs(mouseX - (x + w / 2));
	    let percentX = map(distanceX, 0, w / 2, 1, 0);

	    let distanceY = abs(mouseY - (height / 2));
	    let percentY = map(distanceY, 0, (height / 2) - gap, 1, 0);
	  	fill(255, buttonAlphaPercent * 100 * percentX * percentY);
	}
	rect(x, y, w, h, gap);

	noStroke();
	fill(255, buttonAlphaPercent * 255);
	textSize(h / 10);
	textAlign(CENTER, CENTER);
	text(label, x + w / 2, y + h / 2);
}

function mouseIsInRectangle(x, y, w, h) {
  if (mouseX >= x && mouseX <= x + w) {
    if (mouseY >= y && mouseY <= y + h) {
      return true;
    }
  }
  return false;
}

class HandDecider {
  static bestDiscards(hand) {
    let c = [...hand.cards];

    if(c.length == 5) {
      console.log("Recognized 5 cards in hand");

      let scoresForEachCard = new Array(c.length);
      for(let i = 0; i < scoresForEachCard.length; i++) {
        scoresForEachCard[i] = 0;
      }

      let restOfCards = new Deck(true);
      for(let i = 0; i < c.length; i++) {
        restOfCards.removeCard(c[i]);
      }

      for(let i = 0; i < c.length; i++) {
        let handWithoutCard = new Deck(false);
        for(let add = 0; add < c.length; add++) {
          handWithoutCard.addCard(c[add]);
        }
        handWithoutCard.removeCard(c[i]);
        for(let j = 0; j < restOfCards.cards.length; j++) {
          scoresForEachCard[i] += HandScorer.score(restOfCards.cards[j], handWithoutCard);
          handWithoutCard.removeCard(restOfCards.cards[j]);
        }
      }
      return [scoresForEachCard.indexOf(Math.max(...scoresForEachCard))];

    } else {

      let scoresForEachPair = new Array(15);
      for(let i = 0; i < scoresForEachPair.length; i++) {
        scoresForEachPair[i] = 0;
      }

      let restOfCards = new Deck(true);
      for(let i = 0; i < c.length; i++) {
        restOfCards.removeCard(c[i]);
      }

      let manualCounter = 0;
      for(let first = 0; first < c.length - 1; first++) {
        for(let second = first + 1; second < c.length; second++) {

          let handWithoutCards = new Deck(false);
          for(let j = 0; j < c.length; j++) {
            handWithoutCards.addCard(c[j]);
          }
          handWithoutCards.removeCard(c[first]);
          handWithoutCards.removeCard(c[second]);

          for(let i = 0; i < restOfCards.cards.length; i++) {
            scoresForEachPair[manualCounter] += HandScorer.score(restOfCards.cards[i], handWithoutCards);
            handWithoutCards.removeCard(restOfCards.cards[i]);
          }
          manualCounter++;

        }
      }

      let indexOfMaximum = scoresForEachPair.indexOf(Math.max(...scoresForEachPair));
      manualCounter = 0;
      for(let first = 0; first < c.length - 1; first++) {
        for(let second = first + 1; second < c.length; second++) {
          if(manualCounter == indexOfMaximum) {
            return [first, second];
          }
          manualCounter++;
        }
      }
      console.log("YOU DO NOT WANT TO SEE THIS");
    }
  }
}

class HandScorer {

  static score(draw, hand) {
    if(hand.cards.length != 4) {
      throw "There is not 5 cards in hand. Cannot score... (first)"
    }

    let total = 0;
    total += this.pointsFromKnobs(draw, hand);

    hand.addCard(draw);
    hand = this.sortedCardsFromArray(hand);

    if(hand.cards.length != 5) {
      throw "There is not 5 cards in hand. Cannot score... (second)"
    }

    total += this.pointsFromPairs(hand);
    total += this.pointsFromFifteens(hand); 
    total += this.pointsFromFlush(hand);
    total += this.pointsFromRuns(hand);

    if(false) {
      console.log("Points From Pairs: " + this.pointsFromPairs(hand));
      console.log("Points From 15s: " + this.pointsFromFifteens(hand));
      console.log("Points From Flush: " + this.pointsFromFlush(hand));
      console.log("Points From Runs: " + this.pointsFromRuns(hand));
      console.log("Hand: " + hand.printShort());
      console.log("Points: " + total); 
    }

    return total;
  }

  //  This works!
  static sortedCardsFromArray(hand) {
    let toReturn = [];

    for(let current = 0; current < hand.cards.length; current++) {
      if(toReturn.length == 0) {
        toReturn.push(hand.cards[current]);
      } else {
        let i = 0;
        while(i < toReturn.length && hand.cards[current].rawValue() > toReturn[i].rawValue()) {
          i++;
        }
        toReturn.splice(i, 0, hand.cards[current]);
      }
    }
    let sorted = new Deck(false);
    for(let i = 0; i < toReturn.length; i++) {
      sorted.addCard(toReturn[i]);
    }
    return sorted;
  }

  static pointsFromRuns(hand) {
    let total = 0;

    let shouldCheckIndex = [];

    for(let i = 0; i < hand.cards.length; i++) {
      //don't check the last two because there is no 
      //possible way those can be a run of 3 or more
      shouldCheckIndex.push(i < hand.cards.length - 2);
    }

    for(let currentCardIndex = 0; currentCardIndex < hand.cards.length; shouldCheckIndex[currentCardIndex] = false, currentCardIndex++) {
      if(shouldCheckIndex[currentCardIndex]) {

        let currentCardValue = hand.cards[currentCardIndex].rawValue();
        let currentStreak = 1;

        //think of this as a "not checked" list
        let bufferIndexArray = []
        for(let fillBuffer = 0; fillBuffer < hand.cards.length; fillBuffer++) {
            bufferIndexArray.push(true);
        }
        let duplicateMultiplier = 1;
        let valueOfFirstDuplicate = -1;
        let multipleDuplicates = false;
        for(let futureCardIndex = currentCardIndex + 1; futureCardIndex < hand.cards.length + 1; futureCardIndex++) {
          if(futureCardIndex < hand.cards.length && hand.cards[futureCardIndex].rawValue() == currentCardValue) {
            duplicateMultiplier++;
            if(valueOfFirstDuplicate != -1 && valueOfFirstDuplicate != currentCardValue) {
              multipleDuplicates = true;
            }
            valueOfFirstDuplicate = currentCardValue;
            continue;
          }
          if(futureCardIndex < hand.cards.length && hand.cards[futureCardIndex].rawValue() == currentCardValue + 1) {
            currentStreak++;
            currentCardValue++;
            bufferIndexArray[futureCardIndex] = false;
          } else {
            if(currentStreak >= 3) {
              total += (currentStreak * (duplicateMultiplier + int(multipleDuplicates)));
              for(let b = 0; b < bufferIndexArray.length; b++) {
                if(shouldCheckIndex[b] && !bufferIndexArray[b]) {
                  shouldCheckIndex[b] = false;
                }
              }
            } else {
              currentStreak = 0;
            }
            break;
          }
        }
        
      }
    }

    return total;
  }

  static pointsFromFlush(hand) {
    let suitOfFlush = hand.cards[0].suit().toLowerCase();
    for(let i = 1; i < hand.cards.length; i++) {
      if(hand.cards[i].suit().toLowerCase() != suitOfFlush) {
        return 0;
      }
    }
    return hand.cards.length;
  }

  static numbersBetweenWithout(start, end, without) {
    let toReturn = [];
    let current = start;
    while(current <= end) {
      if(current != without) {
        toReturn.push(current);
      }
      current++;
    }
    return toReturn;
  }

  static createFifteensPossibleCombos() {
    let toReturn = [];
    for(let i = 0; i <= 4; i++) {
      toReturn.push(this.numbersBetweenWithout(0, 4, i));
    }
    for(let first = 0; first <= 3; first++) {
      for(let second = first + 1; second <= 4; second++) {
        toReturn.push([first, second]);
      }
    }
    for(let first = 0; first <= 2; first++) {
      for(let second = first + 1; second <= 3; second++) {
        for(let third = second + 1; third <= 4; third++) {
          toReturn.push([first, second, third]);
        }
      }
    }
    return toReturn;
  }

  static pointsFromFifteens(hand) {
    let total = 0;
    let indexesOfPossibleFifteens = this.createFifteensPossibleCombos();
    for(let i = 0; i < indexesOfPossibleFifteens.length; i++) {
      let currentSetArray = indexesOfPossibleFifteens[i];
      let currentSum = 0;
      for(let j = 0; j < currentSetArray.length; j++) {
        currentSum += hand.cards[currentSetArray[j]].value();
        if(currentSum > 15) {
          break;
        }
      }
      total += int(currentSum == 15) * 2;
    }
    return total;
  }

  static pointsFromKnobs(draw, hand) {
    for(let i = 0; i < hand.cards.length; i++) {
      if(hand.cards[i].valueName().toLowerCase() == "jack") {
        if(hand.cards[i].suit().toLowerCase() == draw.suit().toLowerCase()) {
          return 1;
        }
      }
    }
    return 0;
  }

  static pointsFromPairs(hand) {
    let total = 0;
    for(let first = 0; first < hand.cards.length - 1; first++) {
      for(let second = first + 1; second < hand.cards.length; second++) {
        if(hand.cards[first].valueName() == hand.cards[second].valueName()) {
          total += 2;
        }
      }
    }
    return total;
  }
}
