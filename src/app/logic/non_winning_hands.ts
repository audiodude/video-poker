import { Card, enumerateRanks, enumerateSuits, Rank, Suit } from './deck';
import { cardsForFourOfAKind, cardsForJacksOrBetter, cardsForThreeOfAKind, cardsForTwoPair, cardsWithRank, generateRankMap, isFlush, isFullHouse, isStraight } from './winning_hands';

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

  indices = cardsForJacksOrBetter(cards);
  if (indices.length > 0) {
    return indices;
  }

  indices = cardsForARoyal(cards, 3);
  if (indices.length > 0) {
    console.log('return 3 for a royal');
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

export function cardsForAFlush(cards: Card[], n: number): number[] {
  const suitsInHand: { [key: number]: number } =
    { [Suit.SPADES]: 0, [Suit.DIAMONDS]: 0, [Suit.HEARTS]: 0, [Suit.CLUBS]: 0 };
  for (const c of cards) {
    suitsInHand[c.suit]++;
  }
  const result = [];
  const suits = enumerateSuits();
  for (let s = suits.next(); s && !s.done; s = suits.next()) {
    if (suitsInHand[s.value as Suit] >= n) {
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].suit === s.value) {
          result.push(i);
        }
      }
    }
  }
  return result;
}

export function cardsForAStraightFlush(cards: Card[], n: number): number[] {
  const cardIndicesForFlush = cardsForAFlush(cards, n);
  if (cardIndicesForFlush.length < n) {
    return [];
  }
  const cardsForFlush =
    cardIndicesForFlush.map((i) => [i, cards[i]])
      .sort((a, b) => (a[1] as Card).rank - (b[1] as Card).rank);

  let ranks = enumerateRanks();
  let r;
  const rankToIndices = {};
  while (r = ranks.next().value as Rank) {
    rankToIndices[r] = [];
  }
  for (let i = 0; i < cardsForFlush.length; i++) {
    rankToIndices[(cardsForFlush[i][1] as Card).rank].push(cardsForFlush[i][0]);
  }

  ranks = enumerateRanks();
  let straightIndices = [];
  let misses = 0;
  while (r = ranks.next().value as Rank) {
    if (straightIndices.length > 0 && rankToIndices[r].length === 0) {
      if (misses > 1) {
        straightIndices = [];
        misses = 0;
      } else {
        misses++;
      }
    } else if (rankToIndices[r].length >= 1) {
      straightIndices.push(rankToIndices[r][0]);
      if (straightIndices.length === n && misses < 6 - n) {
        return straightIndices;
      }
    }
  }
  return [];
}

export function cardsForFourToAStraightFlush(cards: Card[]): number[] {
  return cardsForAStraightFlush(cards, 4);
}

export function cardsForThreeToAStraightFlush(cards: Card[]): number[] {
  return cardsForAStraightFlush(cards, 3);
}

export function cardsForFourToAnOutsideStraight(cards: Card[]): number[] {
  let ranks = enumerateRanks();
  let r;
  const rankToIndices = {};
  while (r = ranks.next().value as Rank) {
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

export function cardsForLowPair(cards: Card[]): number[] {
  const rankMap = generateRankMap(cards);
  const ranks = enumerateRanks();
  let foundRank: Rank, r: Rank;

  while (r = ranks.next().value as Rank) {
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
