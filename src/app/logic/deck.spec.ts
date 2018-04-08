import {cardsForFourToAnOutsideStraight, cardsForOneHighCard, cardsForSuitedTenX, cardsForThreeToAStraightFlush, cardsForTwoPair, cardsForTwoSuitedHighCards, cardsForTwoUnsuitedHighCards, Deck, determineHand, enumerateRanks, enumerateSuits, generateRankMap, Hand, isFlush, isFourOfAKind, isFourToAFlush, isFourToARoyal, isFourToAStraightFlush, isFullHouse, isJacksOrBetter, isStraight, isThreeOfAKind, isThreeToARoyal, isTwoPair, Rank, Suit} from './deck';

describe('deck', () => {
  it('contains 4 suits', () => {
    let i = 0;
    const suits = enumerateSuits();
    for (let s = suits.next(); s && !s.done; s = suits.next()) {
      i++;
    }
    expect(i).toBe(4);
  });

  it('contains 13 ranks', () => {
    let i = 0;
    const ranks = enumerateRanks();
    for (let r = ranks.next(); r && !r.done; r = ranks.next()) {
      i++;
    }
    expect(i).toBe(13);
  });

  it('contains 52 cards when constructed', () => {
    const d = new Deck();
    expect(d.cardsRemaining()).toBe(52);
  });

  it('contains 50 cards after dealing two cards', () => {
    const d = new Deck();
    d.deal(2);
    expect(d.cardsRemaining()).toBe(50);
  });

  describe('generateRankMap', () => {
    describe('for different combinations of cards', () => {
      const EXAMPLES = [
        {
          cards: [
            {suit: Suit.DIAMONDS, rank: Rank.ACE},
            {suit: Suit.HEARTS, rank: Rank.ACE},
            {suit: Suit.CLUBS, rank: Rank.TWO},
            {suit: Suit.CLUBS, rank: Rank.SIX},
            {suit: Suit.CLUBS, rank: Rank.EIGHT},
          ],
          expected:
              {[Rank.EIGHT]: 1, [Rank.SIX]: 1, [Rank.TWO]: 1, [Rank.ACE]: 2},
        },
        {
          cards: [
            {suit: Suit.DIAMONDS, rank: Rank.ACE},
            {suit: Suit.HEARTS, rank: Rank.ACE},
            {suit: Suit.CLUBS, rank: Rank.ACE},
            {suit: Suit.CLUBS, rank: Rank.FIVE},
            {suit: Suit.CLUBS, rank: Rank.THREE},
          ],
          expected: {[Rank.FIVE]: 1, [Rank.THREE]: 1, [Rank.ACE]: 3},
        },
        {
          cards: [
            {suit: Suit.DIAMONDS, rank: Rank.ACE},
            {suit: Suit.HEARTS, rank: Rank.ACE},
            {suit: Suit.CLUBS, rank: Rank.ACE},
            {suit: Suit.CLUBS, rank: Rank.KING},
            {suit: Suit.CLUBS, rank: Rank.ACE},
          ],
          expected: {[Rank.KING]: 1, [Rank.ACE]: 4},
        },

        {
          cards: [
            {suit: Suit.DIAMONDS, rank: Rank.TEN},
            {suit: Suit.HEARTS, rank: Rank.TEN},
            {suit: Suit.CLUBS, rank: Rank.TWO},
            {suit: Suit.DIAMONDS, rank: Rank.TWO},
            {suit: Suit.CLUBS, rank: Rank.EIGHT},
          ],
          expected: {[Rank.TEN]: 2, [Rank.TWO]: 2, [Rank.EIGHT]: 1},
        }
      ];

      for (const x of EXAMPLES) {
        it('generates correct maps', () => {
          expect(generateRankMap(x.cards))
              .toEqual(jasmine.objectContaining(x.expected));
        });
      }
    });
  });

  describe('isJacksOrBetter', () => {
    it('returns true for a pair of aces', () => {
      expect(isJacksOrBetter([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('in any order for a pair of aces', () => {
      expect(isJacksOrBetter([
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('returns true for a pair of kings', () => {
      expect(isJacksOrBetter([
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.HEARTS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('returns true for a pair of queens', () => {
      expect(isJacksOrBetter([
        {suit: Suit.DIAMONDS, rank: Rank.QUEEN},
        {suit: Suit.HEARTS, rank: Rank.QUEEN},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('returns true for a pair of jacks', () => {
      expect(isJacksOrBetter([
        {suit: Suit.DIAMONDS, rank: Rank.JACK},
        {suit: Suit.HEARTS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('returns false for a pair of tens', () => {
      expect(isJacksOrBetter([
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.HEARTS, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(false);
    });
  });

  describe('isTwoPair', () => {
    it('returns true for a pair of tens and a pair of twos', () => {
      expect(isTwoPair([
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.HEARTS, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('in any order for a pair of tens and a pair of twos', () => {
      expect(isTwoPair([
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.HEARTS, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('does not return true when there is not two pair', () => {
      expect(isTwoPair([
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.DIAMONDS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(false);
    });
  });

  describe('isThreeOfAKind', () => {
    it('returns true for three sixes', () => {
      expect(isThreeOfAKind([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('in any order for three sixes', () => {
      expect(isThreeOfAKind([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.SPADES, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.SIX},
      ])).toBe(true);
    });

    it('does not return true when there is not three of a kind', () => {
      expect(isThreeOfAKind([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.SPADES, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.ACE},
      ])).toBe(false);
    });
  });

  describe('isFullHouse', () => {
    it('returns true for sixes full of kings', () => {
      expect(isFullHouse([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(true);
    });

    it('returns true for kings full of sixes', () => {
      expect(isFullHouse([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(true);
    });

    it('in any order for kings full of sixes', () => {
      expect(isFullHouse([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(true);
    });

    it('does not return true for three sixes', () => {
      expect(isFullHouse([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(false);
    });
  });

  describe('isFourOfAKind', () => {
    it('returns true for four aces', () => {
      expect(isFourOfAKind([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('in any order for four aces', () => {
      expect(isFourOfAKind([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.ACE},
      ])).toBe(true);
    });

    it('it does not return true for three aces', () => {
      expect(isFourOfAKind([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.TWO},
      ])).toBe(false);
    });
  });

  describe('isStraight', () => {
    it('returns true for a straight', () => {
      expect(isStraight([
        {suit: Suit.DIAMONDS, rank: Rank.THREE},
        {suit: Suit.CLUBS, rank: Rank.FOUR},
        {suit: Suit.SPADES, rank: Rank.FIVE},
        {suit: Suit.HEARTS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SEVEN},
      ])).toBe(true);
    });

    it('in any order for a straight', () => {
      expect(isStraight([
        {suit: Suit.SPADES, rank: Rank.FIVE},
        {suit: Suit.DIAMONDS, rank: Rank.THREE},
        {suit: Suit.SPADES, rank: Rank.SEVEN},
        {suit: Suit.CLUBS, rank: Rank.FOUR},
        {suit: Suit.HEARTS, rank: Rank.SIX},
      ])).toBe(true);
    });

    it('returns true for a wheel straight', () => {
      expect(isStraight([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.FIVE},
        {suit: Suit.SPADES, rank: Rank.TWO},
        {suit: Suit.HEARTS, rank: Rank.FOUR},
        {suit: Suit.SPADES, rank: Rank.THREE},
      ])).toBe(true);
    });

    it('returns true for a broadway straight', () => {
      expect(isStraight([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.HEARTS, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.QUEEN},
      ])).toBe(true);
    });

    it('returns false when there is not a straight', () => {
      expect(isStraight([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.HEARTS, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.QUEEN},
      ])).toBe(false);
    })
  });

  describe('isFlush', () => {
    it('returns true for a spades flush', () => {
      expect(isFlush([
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.THREE},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns true for a hearts flush', () => {
      expect(isFlush([
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.THREE},
        {suit: Suit.HEARTS, rank: Rank.SIX},
        {suit: Suit.HEARTS, rank: Rank.JACK},
        {suit: Suit.HEARTS, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns true for a diamonds flush', () => {
      expect(isFlush([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.DIAMONDS, rank: Rank.THREE},
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.DIAMONDS, rank: Rank.JACK},
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns true for a clubs flush', () => {
      expect(isFlush([
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.THREE},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns false when not a flush', () => {
      expect(isFlush([
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.THREE},
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.TEN},
      ])).toBe(false);
    });
  });

  describe('determineHand', () => {
    it('returns nothing for nothing', () => {
      expect(determineHand([
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.THREE},
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.TEN},
      ])).toBe(Hand.NOTHING);
    });

    it('returns nothing for low pair', () => {
      expect(determineHand([
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.THREE},
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.TEN},
      ])).toBe(Hand.NOTHING);
    });

    it('returns royal flush for royal flush', () => {
      expect(determineHand([
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(Hand.ROYAL_FLUSH);
    });

    it('returns straight flush for straight flush', () => {
      expect(determineHand([
        {suit: Suit.SPADES, rank: Rank.NINE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(Hand.STRAIGHT_FLUSH);
    });

    it('returns four of a kind for four aces', () => {
      expect(determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(Hand.FOUR_OF_A_KIND);
    });

    it('returns full house for kings full of sixes', () => {
      expect(determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(Hand.FULL_HOUSE);
    });

    it('returns flush for flush', () => {
      expect(determineHand([
        {suit: Suit.SPADES, rank: Rank.NINE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.TWO},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(Hand.FLUSH);
    });

    it('returns straight for a straight', () => {
      expect(determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.THREE},
        {suit: Suit.CLUBS, rank: Rank.FOUR},
        {suit: Suit.SPADES, rank: Rank.FIVE},
        {suit: Suit.HEARTS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SEVEN},
      ])).toBe(Hand.STRAIGHT);
    });

    it('returns straight for a wheel straight', () => {
      expect(determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.FIVE},
        {suit: Suit.SPADES, rank: Rank.TWO},
        {suit: Suit.HEARTS, rank: Rank.FOUR},
        {suit: Suit.SPADES, rank: Rank.THREE},
      ])).toBe(Hand.STRAIGHT);
    });

    it('returns three of a kind for three sixes', () => {
      expect(determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(Hand.THREE_OF_A_KIND);
    });

    it('returns two pair for a pair of tens and a pair of twos', () => {
      expect(determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.HEARTS, rank: Rank.TEN},
      ])).toBe(Hand.TWO_PAIR);
    });

    it('returns two pair for a pair of kings and a pair of twos', () => {
      expect(determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.HEARTS, rank: Rank.KING},
      ])).toBe(Hand.TWO_PAIR);
    });

    it('returns two pair for a pair of kings and a pair of jacks', () => {
      expect(determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.JACK},
        {suit: Suit.DIAMONDS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.HEARTS, rank: Rank.KING},
      ])).toBe(Hand.TWO_PAIR);
    });

    it('returns jacks or better for a pair of aces', () => {
      expect(determineHand([
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(Hand.JACKS_OR_BETTER);
    });

    it('returns jacks or better for a pair of kings', () => {
      expect(determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.HEARTS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(Hand.JACKS_OR_BETTER);
    });

    it('returns jacks or better for a pair of queens', () => {
      expect(determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.QUEEN},
        {suit: Suit.HEARTS, rank: Rank.QUEEN},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(Hand.JACKS_OR_BETTER);
    });

    it('returns jacks or better for a pair of jacks', () => {
      expect(determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.JACK},
        {suit: Suit.HEARTS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(Hand.JACKS_OR_BETTER);
    });
  });

  describe('isFourToAFlush', () => {
    it('returns true when there is four to a flush', () => {
      expect(isFourToAFlush([
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.HEARTS, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns true when there is four to a different flush', () => {
      expect(isFourToAFlush([
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.TWO},
        {suit: Suit.HEARTS, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.HEARTS, rank: Rank.SEVEN},
      ])).toBe(true);
    });

    it('returns false when there is not four to a flush', () => {
      expect(isFourToAFlush([
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.TWO},
        {suit: Suit.HEARTS, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.HEARTS, rank: Rank.SEVEN},
      ])).toBe(false);
    });
  });

  describe('isFourToARoyal', () => {
    it('returns true when there is four to a royal', () => {
      expect(isFourToARoyal([
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns true when there is a pat flush and four to a royal', () => {
      expect(isFourToARoyal([
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.TWO},
      ])).toBe(true);
    });

    it('in any order when there is four to a royal', () => {
      expect(isFourToARoyal([
        {suit: Suit.SPADES, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(true);
    });

    it('returns false when there is not four to a royal', () => {
      expect(isFourToARoyal([
        {suit: Suit.SPADES, rank: Rank.NINE},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(false);
    });
  });

  describe('isFourToAStraightFlush', () => {
    it('returns true when there is four to a straight flush', () => {
      expect(isFourToAStraightFlush([
        {suit: Suit.SPADES, rank: Rank.NINE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.DIAMONDS, rank: Rank.TWO},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns true when there is a different four to a straight flush',
       () => {
         expect(isFourToAStraightFlush([
           {suit: Suit.SPADES, rank: Rank.JACK},
           {suit: Suit.SPADES, rank: Rank.TEN},
           {suit: Suit.SPADES, rank: Rank.EIGHT},
           {suit: Suit.SPADES, rank: Rank.QUEEN},
           {suit: Suit.DIAMONDS, rank: Rank.TWO},
         ])).toBe(true);
       });

    it('returns true when there is a pat flush and four to a straight flush',
       () => {
         expect(isFourToAStraightFlush([
           {suit: Suit.SPADES, rank: Rank.NINE},
           {suit: Suit.SPADES, rank: Rank.KING},
           {suit: Suit.SPADES, rank: Rank.TWO},
           {suit: Suit.SPADES, rank: Rank.JACK},
           {suit: Suit.SPADES, rank: Rank.TEN},
         ])).toBe(true);
       });
  });

  describe('isThreeToARoyal', () => {
    it('returns true when there is three to a royal', () => {
      expect(isThreeToARoyal([
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.QUEEN},
        {suit: Suit.CLUBS, rank: Rank.JACK},
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns true when there is a pat flush and four to a royal', () => {
      expect(isThreeToARoyal([
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.THREE},
        {suit: Suit.SPADES, rank: Rank.TWO},
      ])).toBe(true);
    });

    it('in any order when there is three to a royal', () => {
      expect(isThreeToARoyal([
        {suit: Suit.SPADES, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(true);
    });

    it('returns false when there is not three to a royal', () => {
      expect(isThreeToARoyal([
        {suit: Suit.SPADES, rank: Rank.NINE},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(false);
    });
  });

  describe('cardsForTwoPair', () => {
    it('returns the right indices for two pair', () => {
      expect(cardsForTwoPair([
               {suit: Suit.DIAMONDS, rank: Rank.TEN},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.CLUBS, rank: Rank.TWO},
               {suit: Suit.DIAMONDS, rank: Rank.TWO},
               {suit: Suit.CLUBS, rank: Rank.EIGHT},
             ]).sort())
          .toEqual([0, 1, 2, 3]);
    });

    it('returns the right indices for two pair in any order', () => {
      expect(cardsForTwoPair([
               {suit: Suit.CLUBS, rank: Rank.TWO},
               {suit: Suit.DIAMONDS, rank: Rank.TEN},
               {suit: Suit.CLUBS, rank: Rank.EIGHT},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.DIAMONDS, rank: Rank.TWO},
             ]).sort())
          .toEqual([0, 1, 3, 4]);
    });

    it('returns empty array when there is not two pair', () => {
      expect(cardsForTwoPair([
               {suit: Suit.CLUBS, rank: Rank.TWO},
               {suit: Suit.DIAMONDS, rank: Rank.JACK},
               {suit: Suit.CLUBS, rank: Rank.EIGHT},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.DIAMONDS, rank: Rank.TWO},
             ]).sort())
          .toEqual([]);
    });
  });

  describe('cardsForFourToAnOutsideStraight', () => {
    it('returns the right indices for four to an outside straight', () => {
      expect(cardsForFourToAnOutsideStraight([
               {suit: Suit.DIAMONDS, rank: Rank.ACE},
               {suit: Suit.CLUBS, rank: Rank.JACK},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.QUEEN},
             ]).sort())
          .toEqual([1, 2, 3, 4]);
    });

    it('returns the right indices when there are multiple options', () => {
      expect(cardsForFourToAnOutsideStraight([
               {suit: Suit.DIAMONDS, rank: Rank.NINE},
               {suit: Suit.CLUBS, rank: Rank.JACK},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.QUEEN},
             ]).sort())
          .toEqual([0, 1, 3, 4]);
    });

    it('returns empty array when there is not four to an outside straight',
       () => {
         expect(cardsForFourToAnOutsideStraight([
                  {suit: Suit.DIAMONDS, rank: Rank.KING},
                  {suit: Suit.CLUBS, rank: Rank.JACK},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.TWO},
                ]).sort())
             .toEqual([]);
       });
  });

  describe('cardsForTwoSuitedHighCards', () => {
    it('returns the right indices for two suited high cards', () => {
      expect(cardsForTwoSuitedHighCards([
               {suit: Suit.DIAMONDS, rank: Rank.TWO},
               {suit: Suit.SPADES, rank: Rank.JACK},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.QUEEN},
             ]).sort())
          .toEqual([1, 4]);
    });

    it('returns empty array when there are not two suited high cards', () => {
      expect(cardsForTwoSuitedHighCards([
               {suit: Suit.DIAMONDS, rank: Rank.KING},
               {suit: Suit.CLUBS, rank: Rank.JACK},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.TWO},
             ]).sort())
          .toEqual([]);
    });
  });

  describe('cardsForThreeToAStraightFlush', () => {
    it('returns the right indices for three to a straight flush with two gaps',
       () => {
         expect(cardsForThreeToAStraightFlush([
                  {suit: Suit.DIAMONDS, rank: Rank.TWO},
                  {suit: Suit.DIAMONDS, rank: Rank.THREE},
                  {suit: Suit.DIAMONDS, rank: Rank.SIX},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.QUEEN},
                ]).sort())
             .toEqual([0, 1, 2]);
       });

    it('returns the right indices for three to a straight flush with one gap',
       () => {
         expect(cardsForThreeToAStraightFlush([
                  {suit: Suit.DIAMONDS, rank: Rank.TWO},
                  {suit: Suit.DIAMONDS, rank: Rank.THREE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.QUEEN},
                  {suit: Suit.DIAMONDS, rank: Rank.FIVE},
                ]).sort())
             .toEqual([0, 1, 4]);
       });

    it('returns the right indices in any order', () => {
      expect(cardsForThreeToAStraightFlush([
               {suit: Suit.DIAMONDS, rank: Rank.FIVE},
               {suit: Suit.DIAMONDS, rank: Rank.THREE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.QUEEN},
               {suit: Suit.DIAMONDS, rank: Rank.TWO},
             ]).sort())
          .toEqual([0, 1, 4]);
    })
  });

  describe('cardsForTwoUnsuitedHighCards', () => {
    it('returns the right indices for two unsuited high cards', () => {
      expect(cardsForTwoUnsuitedHighCards([
               {suit: Suit.DIAMONDS, rank: Rank.TWO},
               {suit: Suit.DIAMONDS, rank: Rank.JACK},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.QUEEN},
             ]).sort())
          .toEqual([1, 4]);
    });

    it('returns the lowest indices for two unsuited high cards', () => {
      expect(cardsForTwoUnsuitedHighCards([
               {suit: Suit.DIAMONDS, rank: Rank.TWO},
               {suit: Suit.DIAMONDS, rank: Rank.JACK},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.ACE},
               {suit: Suit.SPADES, rank: Rank.QUEEN},
             ]).sort())
          .toEqual([1, 4]);
    });

    it('returns empty array when there are not two unsuited high cards', () => {
      expect(cardsForTwoUnsuitedHighCards([
               {suit: Suit.DIAMONDS, rank: Rank.KING},
               {suit: Suit.CLUBS, rank: Rank.THREE},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.TWO},
             ]).sort())
          .toEqual([]);
    });
  });

  describe('cardsForSuitedTenX', () => {
    it('returns the right indices for suited ten/jack', () => {
      expect(cardsForSuitedTenX([
               {suit: Suit.DIAMONDS, rank: Rank.TEN},
               {suit: Suit.DIAMONDS, rank: Rank.JACK},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.TWO},
             ]).sort())
          .toEqual([0, 1]);
    });

    it('returns the right indices for suited ten/queen', () => {
      expect(cardsForSuitedTenX([
               {suit: Suit.DIAMONDS, rank: Rank.QUEEN},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.DIAMONDS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.TWO},
             ]).sort())
          .toEqual([0, 3]);
    });

    it('returns the right indices for suited ten/king', () => {
      expect(cardsForSuitedTenX([
               {suit: Suit.DIAMONDS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.TWO},
               {suit: Suit.DIAMONDS, rank: Rank.KING},
             ]).sort())
          .toEqual([0, 4]);
    });

    it('returns empty array when there are not two unsuited high cards', () => {
      expect(cardsForSuitedTenX([
               {suit: Suit.DIAMONDS, rank: Rank.KING},
               {suit: Suit.CLUBS, rank: Rank.THREE},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.TWO},
             ]).sort())
          .toEqual([]);
    });
  });

  describe('cardsForOneHighCard', () => {
    it('returns the right indices for one high card', () => {
      expect(cardsForOneHighCard([
               {suit: Suit.DIAMONDS, rank: Rank.TWO},
               {suit: Suit.DIAMONDS, rank: Rank.SIX},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.QUEEN},
             ]).sort())
          .toEqual([4]);
    });

    it('returns empty array when there are no high cards', () => {
      expect(cardsForOneHighCard([
               {suit: Suit.DIAMONDS, rank: Rank.SIX},
               {suit: Suit.CLUBS, rank: Rank.THREE},
               {suit: Suit.SPADES, rank: Rank.NINE},
               {suit: Suit.HEARTS, rank: Rank.TEN},
               {suit: Suit.SPADES, rank: Rank.TWO},
             ]).sort())
          .toEqual([]);
    });
  });
});
