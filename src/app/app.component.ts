import {Component} from '@angular/core';

import {Card, Deck, determineHand, Hand} from './deck';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selections: boolean[];
  cards: Card[];
  deck: Deck;
  firstDeal: boolean;
  gameOver: boolean;
  hand: Hand;
  betAmount: number = 0;
  totalAmount: number = 100;

  constructor() {
    this.emptyDeal();
  }

  onCardHeld(index) {
    this.selections[index] = !this.selections[index];
  }

  bet(amount: number) {
    if (amount == 1 && this.betAmount < 5) {
      this.betAmount++;
    }
    if (amount == 5) {
      this.betAmount = 5;
      this.initialDeal();
    }
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
      this.payout();
      this.firstDeal = false;
    } else {
      this.initialDeal();
    }
  }

  payout() {
    // TODO: logic for paying the player.
  }

  private initialDeal() {
    if (this.totalAmount - this.betAmount < 0) {
      return
    } else {
      this.totalAmount -= this.betAmount;
    }

    this.firstDeal = true;
    this.gameOver = false;

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

  private emptyDeal() {
    this.selections = [false, false, false, false, false];
    this.deck = new Deck();
    this.cards = this.deck.deal(5);
    this.gameOver = true;
  }
}
