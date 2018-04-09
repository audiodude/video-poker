import {Card, enumerateRanks, enumerateSuits, Hand, Rank, Suit} from './deck';

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
