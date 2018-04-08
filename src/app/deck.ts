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

export function cardsForAFlush(cards: Card[], n: number): number[] {
  const suitsInHand: {[key: number]: number} =
      {[Suit.SPADES]: 0, [Suit.DIAMONDS]: 0, [Suit.HEARTS]: 0, [Suit.CLUBS]: 0};
  for (const c of cards) {
    suitsInHand[c.suit]++;
  }
  const result = [];
  const suits = enumerateSuits();
  for (let s = suits.next(); s && !s.done; s = suits.next()) {
    if (suitsInHand[s.value] >= n) {
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].suit === s.value) {
          result.push(i);
        }
      }
    }
  }
  return result;
}

export function isFourToAFlush(cards: Card[]): boolean {
  return cardsForAFlush(cards, 4).length === 4;
}

export function cardsForARoyal(cards: Card[], n: number): number[] {
  const cardIndicesForFlush = cardsForAFlush(cards, n);
  if (cardIndicesForFlush.length < n) {
    return [];
  }
  const cardsForFlush = cardIndicesForFlush.map((i) => [i, cards[i]]);
  const cardIndicesForRoyal = [];
  let countForRoyal = 0;
  for (let i = 0; i < cardsForFlush.length; i++) {
    const c = cardsForFlush[i][1] as Card;
    const idx = cardsForFlush[i][0] as number;
    switch (c.rank) {
      case Rank.TEN:
      case Rank.JACK:
      case Rank.QUEEN:
      case Rank.KING:
      case Rank.ACE:
        cardIndicesForRoyal.push(idx);
    }
  }
  if (cardIndicesForRoyal.length === n) {
    return cardIndicesForRoyal;
  } else {
    return [];
  }
}

export function isFourToARoyal(cards: Card[]): boolean {
  return cardsForARoyal(cards, 4).length >= 4;
}

export function isThreeToARoyal(cards: Card[]): boolean {
  return cardsForARoyal(cards, 3).length >= 3;
}

export function cardsForFourToAStraightFlush(cards: Card[]): number[] {
  const cardIndicesForFlush = cardsForAFlush(cards, 4);
  if (cardIndicesForFlush.length < 4) {
    return [];
  }
  const cardsForFlush =
      cardIndicesForFlush.map((i) => [i, cards[i]])
          .sort((a, b) => (a[1] as Card).rank - (b[1] as Card).rank);
  const rankMap = generateRankMap(cardsForFlush.map((arr) => arr[1] as Card));

  let ranks = enumerateRanks();
  let r;
  const rankToIndices = {};
  while (r = ranks.next().value) {
    rankToIndices[r] = [];
  }
  for (let i = 0; i < cards.length; i++) {
    rankToIndices[cards[i].rank].push(i);
  }

  const straightIndices = [];
  let misses = 0;
  for (let i = 0; i < cardsForFlush.length; i++) {
    const idx = cardsForFlush[i][0] as number;
    const c = cardsForFlush[i][1] as Card;
    const r = c.rank;
    if (straightIndices.length > 0 && rankToIndices[r].length === 0) {
      misses++;
    } else if (rankToIndices[r].length >= 1) {
      straightIndices.push(rankToIndices[r][0]);
      if (straightIndices.length === 4 && misses < 2) {
        return straightIndices;
      }
    }
  }
  return [];
}

export function cardsForThreeToAStraightFlush(cards: Card[]): number[] {
  const cardIndicesForFlush = cardsForAFlush(cards, 3);
  if (cardIndicesForFlush.length < 3) {
    return [];
  }
  const cardsForFlush =
      cardIndicesForFlush.map((i) => [i, cards[i]])
          .sort((a, b) => (a[1] as Card).rank - (b[1] as Card).rank);
  const rankMap = generateRankMap(cardsForFlush.map((arr) => arr[1] as Card));

  let ranks = enumerateRanks();
  let r;
  const rankToIndices = {};
  while (r = ranks.next().value) {
    rankToIndices[r] = [];
  }
  for (let i = 0; i < cards.length; i++) {
    rankToIndices[cards[i].rank].push(i);
  }

  const straightIndices = [];
  let misses = 0;
  for (let i = 0; i < cardsForFlush.length; i++) {
    const idx = cardsForFlush[i][0] as number;
    const c = cardsForFlush[i][1] as Card;
    const r = c.rank;
    if (straightIndices.length > 0 && rankToIndices[r].length === 0) {
      misses++;
    } else if (rankToIndices[r].length >= 1) {
      straightIndices.push(rankToIndices[r][0]);
      if (straightIndices.length === 3 && misses < 3) {
        return straightIndices;
      }
    }
  }
  return [];
}

export function isFourToAStraightFlush(cards: Card[]): boolean {
  return cardsForFourToAStraightFlush(cards).length === 4;
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
  const rankMap = generateRankMap(cards);
  const ranks = enumerateRanks();
  let r;

  let straightCards = 0;
  while (r = ranks.next().value) {
    if (r == Rank.SIX && straightCards === 4 && rankMap[Rank.ACE] === 1) {
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

export function cardsForFourToAnOutsideStraight(cards: Card[]): number[] {
  let ranks = enumerateRanks();
  let r;
  const rankToIndices = {};
  while (r = ranks.next().value) {
    rankToIndices[r] = [];
  }
  for (let i = 0; i < cards.length; i++) {
    rankToIndices[cards[i].rank].push(i);
  }

  ranks = enumerateRanks();
  const straightIndices = [];
  while (r = ranks.next().value) {
    if (straightIndices.length > 0 && rankToIndices[r].length === 0) {
      return [];
    } else if (rankToIndices[r].length >= 1) {
      straightIndices.push(rankToIndices[r][0]);
      if (straightIndices.length === 4) {
        return straightIndices;
      }
    }
  }
  return [];
}

export function generateRankMap(cards: Card[]): {[key: number]: number} {
  let ranks = enumerateRanks();
  let r;
  const rankMap = {};
  while (r = ranks.next().value) {
    rankMap[r] = 0;
  }
  for (const c of cards) {
    rankMap[c.rank]++;
  }
  return rankMap;
}

export function cardsForFourOfAKind(cards: Card[]): number[] {
  const rankMap = generateRankMap(cards);
  const ranks = enumerateRanks();
  let quadRank: Rank, r: Rank;
  while (r = ranks.next().value) {
    if (rankMap[r] === 4) {
      quadRank = r;
      break;
    }
  }
  if (quadRank) {
    return cardsWithRank(cards, quadRank);
  } else {
    return [];
  }
}

export function isFourOfAKind(cards: Card[]): boolean {
  return cardsForFourOfAKind(cards).length > 0;
}

export function isFullHouse(cards: Card[]): boolean {
  const rankMap = generateRankMap(cards);
  const ranks = enumerateRanks();
  let r;

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

export function cardsForThreeOfAKind(cards: Card[]): number[] {
  const rankMap = generateRankMap(cards);
  const ranks = enumerateRanks();
  let tripRank: Rank, r: Rank;
  while (r = ranks.next().value) {
    if (rankMap[r] === 3) {
      tripRank = r;
      break;
    }
  }

  if (tripRank) {
    return cardsWithRank(cards, tripRank);
  } else {
    return [];
  }
}

export function isThreeOfAKind(cards: Card[]): boolean {
  return cardsForThreeOfAKind(cards).length > 0;
}

export function cardsForTwoPair(cards: Card[]): number[] {
  const rankMap = generateRankMap(cards);
  const ranks = enumerateRanks();
  let r;

  const pairs = [];
  while (r = ranks.next().value) {
    if (rankMap[r] === 2) {
      pairs.push(r);
    }
  }
  if (pairs.length == 2) {
    return cardsWithRank(cards, pairs[0])
        .concat(cardsWithRank(cards, pairs[1]));
  } else {
    return [];
  }
}

export function isTwoPair(cards: Card[]): boolean {
  return cardsForTwoPair(cards).length > 0;
}

export function cardsForJacksOrBetter(cards: Card[]): number[] {
  const rankMap = generateRankMap(cards);
  const ranks = enumerateRanks();
  let foundRank: Rank, r: Rank;

  while (r = ranks.next().value) {
    if (r !== Rank.JACK && r !== Rank.QUEEN && r !== Rank.KING &&
        r !== Rank.ACE) {
      continue;
    }
    if (rankMap[r] === 2) {
      foundRank = r;
      break;
    }
  }

  if (foundRank) {
    return cardsWithRank(cards, foundRank)
  } else {
    return [];
  }
}

export function isJacksOrBetter(cards: Card[]): boolean {
  return cardsForJacksOrBetter(cards).length > 0;
}

export function cardsWithRank(cards: Card[], r: Rank): number[] {
  const result = [];
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].rank === r) {
      result.push(i);
    }
  }
  return result;
}

export function handContainsRank(cards: Card[], r: Rank): boolean {
  return cardsWithRank(cards, r).length > 0;
}

export function cardsForLowPair(cards: Card[]): number[] {
  const rankMap = generateRankMap(cards);
  const ranks = enumerateRanks();
  let foundRank: Rank, r: Rank;

  while (r = ranks.next().value) {
    if (r === Rank.JACK || r === Rank.QUEEN || r === Rank.KING ||
        r === Rank.ACE) {
      continue;
    }
    if (rankMap[r] === 2) {
      foundRank = r;
      break;
    }
  }

  if (foundRank) {
    return cardsWithRank(cards, foundRank)
  } else {
    return [];
  }
}

export function cardsForTwoSuitedHighCards(cards: Card[]): number[] {
  const suitToIndices = {
    [Suit.SPADES]: [],
    [Suit.DIAMONDS]: [],
    [Suit.HEARTS]: [],
    [Suit.CLUBS]: [],
  };

  for (let i = 0; i < cards.length; i++) {
    const c = cards[i];
    const r = c.rank;
    if (r !== Rank.JACK && r !== Rank.QUEEN && r !== Rank.KING &&
        r !== Rank.ACE) {
      continue;
    }
    suitToIndices[c.suit].push(i);
    if (suitToIndices[c.suit].length === 2) {
      return suitToIndices[c.suit];
    }
  }
  return [];
}

export function cardsForTwoUnsuitedHighCards(cards: Card[]): number[] {
  const indices = [];

  for (let i = 0; i < cards.length; i++) {
    const c = cards[i];
    const r = c.rank;
    if (r !== Rank.JACK && r !== Rank.QUEEN && r !== Rank.KING &&
        r !== Rank.ACE) {
      continue;
    }
    indices.push(i);
  }
  while (indices.length > 2) {
    let highest = Rank.TWO;
    let highestIdx = -1;
    for (let i = 0; i < indices.length; i++) {
      if (cards[indices[i]].rank > highest) {
        highest = cards[indices[i]].rank;
        highestIdx = i;
      }
    }
    indices.splice(highestIdx, 1);
  }
  if (indices.length == 2) {
    return indices;
  } else {
    return [];
  }
}

export function cardsForSuitedTenX(cards: Card[]): number[] {
  let tenSuits = [];
  let tenIndices = [];
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].rank === Rank.TEN) {
      tenSuits.push(cards[i].suit);
      tenIndices.push(i);
    }
  }
  if (tenIndices.length == 0) {
    return [];
  }

  for (let i = 0; i < cards.length; i++) {
    console.log(Rank.KING, cards[i].rank);
    if (cards[i].rank === Rank.QUEEN || cards[i].rank === Rank.JACK ||
        cards[i].rank === Rank.KING) {
      const suitIdx = tenSuits.indexOf(cards[i].suit);
      if (suitIdx !== -1) {
        return [i, tenIndices[suitIdx]];
      }
    }
  }
  return [];
}

export function cardsForOneHighCard(cards: Card[]): number[] {
  const indices = [];

  for (let i = 0; i < cards.length; i++) {
    const c = cards[i];
    const r = c.rank;
    if (r === Rank.JACK || r === Rank.QUEEN || r === Rank.KING ||
        r === Rank.ACE) {
      return [i];
    }
  }
  return [];
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

export function bestCardsToHold(cards: Card[]): number[] {
  const flush = isFlush(cards);
  const straight = isStraight(cards);

  if (flush && straight) {
    return [0, 1, 2, 3, 4];
  }

  let indices = cardsForFourOfAKind(cards);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForARoyal(cards, 4);
  if (indices.length > 0) {
    return indices;
  }

  if (flush || straight || isFullHouse(cards)) {
    return [0, 1, 2, 3, 4];
  }

  indices = cardsForThreeOfAKind(cards);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForFourToAStraightFlush(cards);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForTwoPair(cards);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForARoyal(cards, 3);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForAFlush(cards, 4);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForLowPair(cards);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForFourToAnOutsideStraight(cards);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForTwoSuitedHighCards(cards);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForThreeToAStraightFlush(cards);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForTwoUnsuitedHighCards(cards);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForSuitedTenX(cards);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForOneHighCard(cards);
  if (indices.length > 0) {
    return indices;
  }

  return [];
}
