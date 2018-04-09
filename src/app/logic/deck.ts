export function* enumerateSuits() {
  yield* [Suit.SPADES, Suit.DIAMONDS, Suit.HEARTS, Suit.CLUBS];
}

export function* enumerateRanks() {
  yield* [
    Rank.TWO,
    Rank.THREE,
    Rank.FOUR,
    Rank.FIVE,
    Rank.SIX,
    Rank.SEVEN,
    Rank.EIGHT,
    Rank.NINE,
    Rank.TEN,
    Rank.JACK,
    Rank.QUEEN,
    Rank.KING,
    Rank.ACE,
  ];
}

export enum Suit {
  SPADES = 0,
  DIAMONDS = 1,
  HEARTS = 2,
  CLUBS = 3,
}

export enum Rank {
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  JACK = 11,
  QUEEN = 12,
  KING = 13,
  ACE = 14,
}

export enum Hand {
  ROYAL_FLUSH,
  STRAIGHT_FLUSH,
  FOUR_OF_A_KIND,
  FOUR_TO_A_ROYAL,
  FULL_HOUSE,
  FLUSH,
  STRAIGHT,
  THREE_OF_A_KIND,
  FOUR_TO_A_STRAIGHT_FLUSH,
  TWO_PAIR,
  JACKS_OR_BETTER,
  THREE_TO_A_ROYAL_FLUSH,
  FOUR_TO_A_FLUSH,
  LOW_PAIR,
  FOUR_TO_AN_OUTSIDE_STRAIGHT,
  TWO_SUITED_HIGH_CARDS,
  THREE_TO_A_STRAIGHT_FLUSH,
  TWO_UNSUITED_HIGH_CARDS,
  SUITED_TEN_X,
  ONE_HIGH_CARD,
  NOTHING,
}

export type Card = {
  suit: Suit,
  rank: Rank,
  hidden?: boolean,
}

export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.cards = [];
    let s, r;
    const suits = enumerateSuits();
    for (let s = suits.next(); s && !s.done; s = suits.next()) {
      const ranks = enumerateRanks();
      for (let r = ranks.next(); r && !r.done; r = ranks.next()) {
        this.cards.push({suit: s.value, rank: r.value, hidden: true});
      }
    }
  }

  cardsRemaining() {
    return this.cards.length;
  }

  shuffle() {
    let randomizedDeck = [];
    let array = this.cards.slice();
    while (array.length !== 0) {
      let rIndex = Math.floor(array.length * Math.random());
      randomizedDeck.push(array[rIndex]);
      array.splice(rIndex, 1)
    }
    this.cards = randomizedDeck;
  }

  deal(n: number): Card[] {
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(this.cards.pop());
    }
    return result;
  }
}
