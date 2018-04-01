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

export function isFlush(cards: Card[]): boolean {
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

export function isStraight(cards: Card[]): boolean {
  let ranks = enumerateRanks();
  let r;
  const rankMap = {};
  while (r = ranks.next().value) {
    rankMap[r] = 0;
  }
  for (const c of cards) {
    rankMap[c.rank]++;
  }
  ranks = enumerateRanks();
  let straightCards = 0;
  while (r = ranks.next().value) {
    if (r == Rank.SIX && straightCards == 4 && rankMap[Rank.ACE] == 1) {
      // Wheel straight
      return true;
    }
    if (straightCards > 0 && rankMap[r] === 0) {
      return false;
    } else if (rankMap[r] === 1) {
      straightCards++;
      if (straightCards === 5) {
        return true;
      }
    }
  }
  return false;
}

export function isFourOfAKind(cards: Card[]): boolean {
  let ranks = enumerateRanks();
  let r;
  const rankMap = {};
  while (r = ranks.next().value) {
    rankMap[r] = 0;
  }
  for (const c of cards) {
    rankMap[c.rank]++;
  }
  ranks = enumerateRanks();
  while (r = ranks.next().value) {
    if (rankMap[r] === 4) {
      return true;
    }
  }
  return false;
}

export function isFullHouse(cards: Card[]): boolean {
  let ranks = enumerateRanks();
  let r;
  const rankMap = {};
  while (r = ranks.next().value) {
    rankMap[r] = 0;
  }
  for (const c of cards) {
    rankMap[c.rank]++;
  }
  ranks = enumerateRanks();

  let foundThree = false;
  let foundPair = false;
  while (r = ranks.next().value) {
    if (rankMap[r] === 3) {
      foundThree = true;
    } else if (rankMap[r] === 2) {
      foundPair = true;
    }
  }
  return foundThree && foundPair;
}

export function isThreeOfAKind(cards: Card[]): boolean {
  let ranks = enumerateRanks();
  let r;
  const rankMap = {};
  while (r = ranks.next().value) {
    rankMap[r] = 0;
  }
  for (const c of cards) {
    rankMap[c.rank]++;
  }
  ranks = enumerateRanks();

  let foundThree = false;
  while (r = ranks.next().value) {
    if (rankMap[r] === 3) {
      return true;
    }
  }
  return false;
}

export function isTwoPair(cards: Card[]): boolean {
  let ranks = enumerateRanks();
  let r;
  const rankMap = {};
  while (r = ranks.next().value) {
    rankMap[r] = 0;
  }
  for (const c of cards) {
    rankMap[c.rank]++;
  }
  ranks = enumerateRanks();

  let pairsFound = 0;
  while (r = ranks.next().value) {
    if (rankMap[r] === 2) {
      pairsFound++;
    }
  }
  return pairsFound === 2;
}

export function isJacksOrBetter(cards: Card[]): boolean {
  let ranks = enumerateRanks();
  let r;
  const rankMap = {};
  while (r = ranks.next().value) {
    rankMap[r] = 0;
  }
  for (const c of cards) {
    rankMap[c.rank]++;
  }
  ranks = enumerateRanks();

  while (r = ranks.next().value) {
    if (r !== Rank.JACK && r !== Rank.QUEEN && r !== Rank.KING &&
        r !== Rank.ACE) {
      continue;
    }
    if (rankMap[r] === 2) {
      return true;
    }
  }
  return false;
}

export function handContainsRank(cards: Card[], r: Rank): boolean {
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
  } else if (isFourOfAKind(cards)) {
    return Hand.FOUR_OF_A_KIND;
  } else if (isFullHouse(cards)) {
    return Hand.FULL_HOUSE;
  } else if (flush) {
    return Hand.FLUSH;
  } else if (straight) {
    return Hand.STRAIGHT;
  } else if (isThreeOfAKind(cards)) {
    return Hand.THREE_OF_A_KIND;
  } else if (isTwoPair(cards)) {
    return Hand.TWO_PAIR;
  } else if (isJacksOrBetter(cards)) {
    return Hand.JACKS_OR_BETTER;
  } else {
    return Hand.NOTHING;
  }
}
