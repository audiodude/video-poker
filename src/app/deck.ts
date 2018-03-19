function* enumerateSuits() {
  yield* [Suit.SPADES, Suit.DIAMONDS, Suit.HEARTS, Suit.CLUBS]
}

function* enumerateRanks() {
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
  ]
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
  FULL_HOUSE,
  FLUSH,
  STRAIGHT,
  THREE_OF_A_KIND,
  TWO_PAIR,
  JACKS_OR_BETTER,
  NOTHING,
}

export type Card = {
  suit: Suit,
  rank: Rank,
  hidden: boolean,
}

export class Deck {
  private cards: Card[] = [];

  constructor() {
    let s, r;
    const suits = enumerateSuits();
    const ranks = enumerateRanks()
    while (s = suits.next().value) {
      while (r = ranks.next().value) {
        this.cards.push({suit: s, rank: r, hidden: true});
      }
    }

    this.cards = [
      {suit: Suit.CLUBS, rank: Rank.FOUR, hidden: true},
      {suit: Suit.CLUBS, rank: Rank.THREE, hidden: true},
      {suit: Suit.CLUBS, rank: Rank.FIVE, hidden: true},
      {suit: Suit.CLUBS, rank: Rank.SIX, hidden: true},
      {suit: Suit.CLUBS, rank: Rank.TWO, hidden: true},
    ]
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

function isFlush(cards: Card[]): boolean {
  const suitsInHand =
      {[Suit.SPADES]: 0, [Suit.DIAMONDS]: 0, [Suit.HEARTS]: 0, [Suit.CLUBS]: 0};
  for (const c of cards) {
    suitsInHand[c.suit]++;
  }
  for (let k in suitsInHand) {
    if (suitsInHand.hasOwnProperty(k) && suitsInHand[k] == 5) {
      return true;
    }
  }
  return false
}

function isStraight(cards: Card[]): boolean {
  const ranks = cards.map((c) => {return c.rank});
  ranks.sort((a, b) => a - b);
  const sum = ranks.reduce((acc, cur) => acc + cur);
  if ((sum - ranks[2]) / 4 === ranks[2]) {
    return true;
  } else if (
      ranks[0] === Rank.TWO && ranks[1] === Rank.THREE &&
      ranks[2] == Rank.FOUR && ranks[3] === Rank.FIVE &&
      ranks[4] === Rank.ACE) {
    return true;
  }
  return false;
}

function handContainsRank(cards: Card[], r: Rank): boolean {
  for (const c of cards) {
    if (c.rank == r) {
      return true;
    }
  }
  return false;
}

export function determineHand(cards: Card[]): Hand {
  if (cards.length != 5) {
    return null;
  }

  const flush = isFlush(cards);
  const straight = isStraight(cards);

  if (flush && straight) {
    if (handContainsRank(cards, Rank.TEN) &&
        handContainsRank(cards, Rank.ACE)) {
      return Hand.ROYAL_FLUSH;
    } else {
      return Hand.STRAIGHT_FLUSH;
    }
  } else if (flush) {
    return Hand.FLUSH;
  } else if (straight) {
    return Hand.STRAIGHT;
  }
}
