import {Component, OnInit} from '@angular/core';

import {Card, Deck, Hand} from './logic/deck';
import {bestCardsToHold} from './logic/non_winning_hands';
import {determineHand} from './logic/winning_hands';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selections: boolean[];
  highlights: boolean[];
  cards: Card[];
  initialCards: Card[];
  deck: Deck;
  firstDeal: boolean;
  gameOver: boolean;
  showOptimal: boolean;
  showingInitialCards: boolean;
  isOptimal: boolean;
  hand: Hand;
  clearBet: boolean;
  betAmount: number = 0;
  totalAmount: number = 500;
  denomination = 1;
  newTotalAmount: number;
  isAnimatingPayout: boolean;
  optimalHand: number[];
  streak = 0;

  PAYOUTS = [
    {
      [Hand.ROYAL_FLUSH]: 250,
      [Hand.STRAIGHT_FLUSH]: 50,
      [Hand.FOUR_OF_A_KIND]: 25,
      [Hand.FULL_HOUSE]: 9,
      [Hand.FLUSH]: 6,
      [Hand.STRAIGHT]: 4,
      [Hand.THREE_OF_A_KIND]: 3,
      [Hand.TWO_PAIR]: 2,
      [Hand.JACKS_OR_BETTER]: 1,
    },
    {
      [Hand.ROYAL_FLUSH]: 500,
      [Hand.STRAIGHT_FLUSH]: 100,
      [Hand.FOUR_OF_A_KIND]: 50,
      [Hand.FULL_HOUSE]: 18,
      [Hand.FLUSH]: 12,
      [Hand.STRAIGHT]: 8,
      [Hand.THREE_OF_A_KIND]: 6,
      [Hand.TWO_PAIR]: 4,
      [Hand.JACKS_OR_BETTER]: 2,
    },
    {
      [Hand.ROYAL_FLUSH]: 750,
      [Hand.STRAIGHT_FLUSH]: 150,
      [Hand.FOUR_OF_A_KIND]: 75,
      [Hand.FULL_HOUSE]: 27,
      [Hand.FLUSH]: 18,
      [Hand.STRAIGHT]: 12,
      [Hand.THREE_OF_A_KIND]: 9,
      [Hand.TWO_PAIR]: 6,
      [Hand.JACKS_OR_BETTER]: 3,
    },
    {
      [Hand.ROYAL_FLUSH]: 1000,
      [Hand.STRAIGHT_FLUSH]: 200,
      [Hand.FOUR_OF_A_KIND]: 100,
      [Hand.FULL_HOUSE]: 36,
      [Hand.FLUSH]: 24,
      [Hand.STRAIGHT]: 16,
      [Hand.THREE_OF_A_KIND]: 12,
      [Hand.TWO_PAIR]: 8,
      [Hand.JACKS_OR_BETTER]: 4,
    },
    {
      [Hand.ROYAL_FLUSH]: 4000,
      [Hand.STRAIGHT_FLUSH]: 250,
      [Hand.FOUR_OF_A_KIND]: 125,
      [Hand.FULL_HOUSE]: 45,
      [Hand.FLUSH]: 30,
      [Hand.STRAIGHT]: 20,
      [Hand.THREE_OF_A_KIND]: 15,
      [Hand.TWO_PAIR]: 10,
      [Hand.JACKS_OR_BETTER]: 5,
    },
  ]

  constructor() {
    this.emptyDeal();
  }

  onCardHeld(index) {
    this.selections[index] = !this.selections[index];
  }

  bet(amount: number) {
    if (this.firstDeal) {
      return;
    }
    if (amount === 1 && this.clearBet) {
      this.betAmount = 1;
      this.clearBet = false;
    } else if (amount === 1 && this.betAmount < 5) {
      this.betAmount++;
    }
    if (amount == 5) {
      this.betAmount = 5;
      this.initialDeal();
    }
  }

  onDenominationChange(newDenomination) {
    this.totalAmount = this.totalAmount * this.denomination / newDenomination;
    this.denomination = newDenomination;
  }

  deal() {
    if (this.isAnimatingPayout) {
      this.isAnimatingPayout = false;
      return;
    }
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
      setTimeout(() => {
        this.hand = determineHand(this.cards);
        this.payout();
        this.showOptimal = true;
        this.showOptimalHand();
      }, 200 + 200 * animationCounter);
      this.firstDeal = false;
      this.clearBet = true;
    } else {
      this.initialDeal();
    }
  }

  payout() {
    let payout = this.PAYOUTS[this.betAmount - 1][this.hand];
    if (payout) {
      this.newTotalAmount = this.totalAmount + payout;
      this.isAnimatingPayout = true;
      this.animatePayout();
    } else {
      this.gameOver = true;
      this.hand = Hand.NOTHING;
    }
  }

  animatePayout() {
    if (!this.isAnimatingPayout) {
      this.totalAmount = this.newTotalAmount;
      return;
    }

    if (this.totalAmount < this.newTotalAmount) {
      setTimeout(() => {
        this.totalAmount++;
        this.animatePayout();
      }, 150);
    } else {
      this.isAnimatingPayout = false;
    }
  }

  showOptimalHand() {
    this.isOptimal = true;
    for (let idx = 0; idx < this.selections.length; idx++) {
      if (this.optimalHand.indexOf(idx) != -1) {
        this.isOptimal = this.isOptimal && this.selections[idx];
      } else {
        this.isOptimal = this.isOptimal && !this.selections[idx];
      }
    }

    if (this.isOptimal) {
      this.streak++;
    } else {
      this.streak = 0;
    }
  }

  revealOptimal() {
    this.gameOver = false;
    let swap = this.cards;
    this.cards = this.initialCards;
    this.initialCards = swap;

    if (this.showingInitialCards) {
      this.highlights = [false, false, false, false, false];
    } else {
      for (const idx of this.optimalHand) {
        this.highlights[idx] = true;
      }
    }

    this.showingInitialCards = !this.showingInitialCards;
  }

  private initialDeal() {
    if (this.totalAmount - this.betAmount < 0) {
      return;
    } else {
      this.totalAmount -= this.betAmount;
    }

    this.firstDeal = true;
    this.gameOver = false;
    this.showOptimal = false;
    this.isOptimal = false;
    this.showingInitialCards = false;
    this.hand = Hand.NOTHING;

    this.selections = [false, false, false, false, false];
    this.highlights = [false, false, false, false, false];
    this.deck = new Deck();
    this.deck.shuffle();

    this.cards = this.deck.deal(5);
    this.initialCards = this.cards.slice(0);

    for (let i = 0; i < this.cards.length; i++) {
      setTimeout(() => {
        this.cards[i].hidden = false;
      }, 200 + 200 * i);
    }
    setTimeout(() => {
      this.hand = determineHand(this.cards);
      this.optimalHand = bestCardsToHold(this.cards);
    }, 200 * this.cards.length);
  }

  private emptyDeal() {
    this.selections = [false, false, false, false, false];
    this.highlights = [false, false, false, false, false];
    this.deck = new Deck();
    this.cards = this.deck.deal(5);
    this.gameOver = true;
    this.clearBet = true;
  }

  ngOnInit() {
    const cardPngs = [
      '/10_of_clubs.png',
      '/10_of_diamonds.png',
      '/10_of_hearts.png',
      '/10_of_spades.png',
      '/2_of_clubs.png',
      '/2_of_diamonds.png',
      '/2_of_hearts.png',
      '/2_of_spades.png',
      '/3_of_clubs.png',
      '/3_of_diamonds.png',
      '/3_of_hearts.png',
      '/3_of_spades.png',
      '/4_of_clubs.png',
      '/4_of_diamonds.png',
      '/4_of_hearts.png',
      '/4_of_spades.png',
      '/5_of_clubs.png',
      '/5_of_diamonds.png',
      '/5_of_hearts.png',
      '/5_of_spades.png',
      '/6_of_clubs.png',
      '/6_of_diamonds.png',
      '/6_of_hearts.png',
      '/6_of_spades.png',
      '/7_of_clubs.png',
      '/7_of_diamonds.png',
      '/7_of_hearts.png',
      '/7_of_spades.png',
      '/8_of_clubs.png',
      '/8_of_diamonds.png',
      '/8_of_hearts.png',
      '/8_of_spades.png',
      '/9_of_clubs.png',
      '/9_of_diamonds.png',
      '/9_of_hearts.png',
      '/9_of_spades.png',
      '/ace_of_clubs.png',
      '/ace_of_diamonds.png',
      '/ace_of_hearts.png',
      '/ace_of_spades.png',
      '/back.jpg',
      '/jack_of_clubs.png',
      '/jack_of_diamonds.png',
      '/jack_of_hearts.png',
      '/jack_of_spades.png',
      '/king_of_clubs.png',
      '/king_of_diamonds.png',
      '/king_of_hearts.png',
      '/king_of_spades.png',
      '/queen_of_clubs.png',
      '/queen_of_diamonds.png',
      '/queen_of_hearts.png',
      '/queen_of_spades.png',
    ];

    for (const png of cardPngs) {
      const img = new Image();
      img.src = png;
    }
  }
}
