import {Component} from '@angular/core';

import {Card, Deck, determineHand, Hand} from '../deck';


@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent {
  selections: boolean[];
  cards: Card[];
  deck: Deck;
  firstDeal: boolean;
  hand: Hand;

  constructor() {
    this.initialDeal();
  }

  onCardHeld(index) {
    this.selections[index] = !this.selections[index];
  }

  deal() {
    if (this.firstDeal) {
      let animationCounter = 0;
      for (let i = 0; i < this.selections.length; i++) {
        if (this.selections[i]) {
          continue;
        }
        this.cards[i] = this.deck.deal(1)[0];
        setTimeout(() => {
          this.cards[i].hidden = false;
        }, 200 + 200 * animationCounter);
        animationCounter++;
      }
      this.hand = determineHand(this.cards);
      this.firstDeal = false;
    } else {
      this.initialDeal();
    }
  }

  private initialDeal() {
    this.firstDeal = true;
    this.selections = [false, false, false, false, false];
    this.deck = new Deck();
    this.deck.shuffle();

    this.cards = this.deck.deal(5);

    for (let i = 0; i < this.cards.length; i++) {
      setTimeout(() => {
        this.cards[i].hidden = false;
      }, 200 + 200 * i);
    }
    this.hand = determineHand(this.cards);
  }
}
