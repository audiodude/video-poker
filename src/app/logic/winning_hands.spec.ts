import {Hand, Rank, Suit} from './deck';
import * as wh from './winning_hands';

describe('winning_hands module', () => {
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
          expect(wh.generateRankMap(x.cards))
              .toEqual(jasmine.objectContaining(x.expected));
        });
      }
    });
  });

  describe('isJacksOrBetter', () => {
    it('returns true for a pair of aces', () => {
      expect(wh.isJacksOrBetter([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('in any order for a pair of aces', () => {
      expect(wh.isJacksOrBetter([
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('returns true for a pair of kings', () => {
      expect(wh.isJacksOrBetter([
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.HEARTS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('returns true for a pair of queens', () => {
      expect(wh.isJacksOrBetter([
        {suit: Suit.DIAMONDS, rank: Rank.QUEEN},
        {suit: Suit.HEARTS, rank: Rank.QUEEN},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('returns true for a pair of jacks', () => {
      expect(wh.isJacksOrBetter([
        {suit: Suit.DIAMONDS, rank: Rank.JACK},
        {suit: Suit.HEARTS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('returns false for a pair of tens', () => {
      expect(wh.isJacksOrBetter([
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
      expect(wh.isTwoPair([
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.HEARTS, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(true);
    });

    it('in any order for a pair of tens and a pair of twos', () => {
      expect(wh.isTwoPair([
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.HEARTS, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('does not return true when there is not two pair', () => {
      expect(wh.isTwoPair([
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
      expect(wh.isThreeOfAKind([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('in any order for three sixes', () => {
      expect(wh.isThreeOfAKind([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.SPADES, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.SIX},
      ])).toBe(true);
    });

    it('does not return true when there is not three of a kind', () => {
      expect(wh.isThreeOfAKind([
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
      expect(wh.isFullHouse([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(true);
    });

    it('returns true for kings full of sixes', () => {
      expect(wh.isFullHouse([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(true);
    });

    it('in any order for kings full of sixes', () => {
      expect(wh.isFullHouse([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(true);
    });

    it('does not return true for three sixes', () => {
      expect(wh.isFullHouse([
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
      expect(wh.isFourOfAKind([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('in any order for four aces', () => {
      expect(wh.isFourOfAKind([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.ACE},
      ])).toBe(true);
    });

    it('it does not return true for three aces', () => {
      expect(wh.isFourOfAKind([
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
      expect(wh.isStraight([
        {suit: Suit.DIAMONDS, rank: Rank.THREE},
        {suit: Suit.CLUBS, rank: Rank.FOUR},
        {suit: Suit.SPADES, rank: Rank.FIVE},
        {suit: Suit.HEARTS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SEVEN},
      ])).toBe(true);
    });

    it('in any order for a straight', () => {
      expect(wh.isStraight([
        {suit: Suit.SPADES, rank: Rank.FIVE},
        {suit: Suit.DIAMONDS, rank: Rank.THREE},
        {suit: Suit.SPADES, rank: Rank.SEVEN},
        {suit: Suit.CLUBS, rank: Rank.FOUR},
        {suit: Suit.HEARTS, rank: Rank.SIX},
      ])).toBe(true);
    });

    it('returns true for a wheel straight', () => {
      expect(wh.isStraight([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.FIVE},
        {suit: Suit.SPADES, rank: Rank.TWO},
        {suit: Suit.HEARTS, rank: Rank.FOUR},
        {suit: Suit.SPADES, rank: Rank.THREE},
      ])).toBe(true);
    });

    it('returns true for a broadway straight', () => {
      expect(wh.isStraight([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.HEARTS, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.QUEEN},
      ])).toBe(true);
    });

    it('returns false when there is not a straight', () => {
      expect(wh.isStraight([
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
      expect(wh.isFlush([
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.THREE},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns true for a hearts flush', () => {
      expect(wh.isFlush([
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.THREE},
        {suit: Suit.HEARTS, rank: Rank.SIX},
        {suit: Suit.HEARTS, rank: Rank.JACK},
        {suit: Suit.HEARTS, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns true for a diamonds flush', () => {
      expect(wh.isFlush([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.DIAMONDS, rank: Rank.THREE},
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.DIAMONDS, rank: Rank.JACK},
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns true for a clubs flush', () => {
      expect(wh.isFlush([
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.THREE},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.TEN},
      ])).toBe(true);
    });

    it('returns false when not a flush', () => {
      expect(wh.isFlush([
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
      expect(wh.determineHand([
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.THREE},
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.TEN},
      ])).toBe(Hand.NOTHING);
    });

    it('returns nothing for low pair', () => {
      expect(wh.determineHand([
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.THREE},
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.TEN},
      ])).toBe(Hand.NOTHING);
    });

    it('returns royal flush for royal flush', () => {
      expect(wh.determineHand([
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(Hand.ROYAL_FLUSH);
    });

    it('returns straight flush for straight flush', () => {
      expect(wh.determineHand([
        {suit: Suit.SPADES, rank: Rank.NINE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.QUEEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(Hand.STRAIGHT_FLUSH);
    });

    it('returns four of a kind for four aces', () => {
      expect(wh.determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.ACE},
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(Hand.FOUR_OF_A_KIND);
    });

    it('returns full house for kings full of sixes', () => {
      expect(wh.determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.KING},
      ])).toBe(Hand.FULL_HOUSE);
    });

    it('returns flush for flush', () => {
      expect(wh.determineHand([
        {suit: Suit.SPADES, rank: Rank.NINE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.TWO},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(Hand.FLUSH);
    });

    it('returns straight for a straight', () => {
      expect(wh.determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.THREE},
        {suit: Suit.CLUBS, rank: Rank.FOUR},
        {suit: Suit.SPADES, rank: Rank.FIVE},
        {suit: Suit.HEARTS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SEVEN},
      ])).toBe(Hand.STRAIGHT);
    });

    it('returns straight for a wheel straight', () => {
      expect(wh.determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.FIVE},
        {suit: Suit.SPADES, rank: Rank.TWO},
        {suit: Suit.HEARTS, rank: Rank.FOUR},
        {suit: Suit.SPADES, rank: Rank.THREE},
      ])).toBe(Hand.STRAIGHT);
    });

    it('returns three of a kind for three sixes', () => {
      expect(wh.determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.SPADES, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.SPADES, rank: Rank.TEN},
      ])).toBe(Hand.THREE_OF_A_KIND);
    });

    it('returns two pair for a pair of tens and a pair of twos', () => {
      expect(wh.determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.HEARTS, rank: Rank.TEN},
      ])).toBe(Hand.TWO_PAIR);
    });

    it('returns two pair for a pair of kings and a pair of twos', () => {
      expect(wh.determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.HEARTS, rank: Rank.KING},
      ])).toBe(Hand.TWO_PAIR);
    });

    it('returns two pair for a pair of kings and a pair of jacks', () => {
      expect(wh.determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.JACK},
        {suit: Suit.DIAMONDS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
        {suit: Suit.HEARTS, rank: Rank.KING},
      ])).toBe(Hand.TWO_PAIR);
    });

    it('returns jacks or better for a pair of aces', () => {
      expect(wh.determineHand([
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.HEARTS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(Hand.JACKS_OR_BETTER);
    });

    it('returns jacks or better for a pair of kings', () => {
      expect(wh.determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.KING},
        {suit: Suit.HEARTS, rank: Rank.KING},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(Hand.JACKS_OR_BETTER);
    });

    it('returns jacks or better for a pair of queens', () => {
      expect(wh.determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.QUEEN},
        {suit: Suit.HEARTS, rank: Rank.QUEEN},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(Hand.JACKS_OR_BETTER);
    });

    it('returns jacks or better for a pair of jacks', () => {
      expect(wh.determineHand([
        {suit: Suit.DIAMONDS, rank: Rank.JACK},
        {suit: Suit.HEARTS, rank: Rank.JACK},
        {suit: Suit.CLUBS, rank: Rank.TWO},
        {suit: Suit.CLUBS, rank: Rank.SIX},
        {suit: Suit.CLUBS, rank: Rank.EIGHT},
      ])).toBe(Hand.JACKS_OR_BETTER);
    });
  });

  describe('cardsForTwoPair', () => {
    it('returns the right indices for two pair', () => {
      expect(wh.cardsForTwoPair([
                 {suit: Suit.DIAMONDS, rank: Rank.TEN},
                 {suit: Suit.HEARTS, rank: Rank.TEN},
                 {suit: Suit.CLUBS, rank: Rank.TWO},
                 {suit: Suit.DIAMONDS, rank: Rank.TWO},
                 {suit: Suit.CLUBS, rank: Rank.EIGHT},
               ]).sort())
          .toEqual([0, 1, 2, 3]);
    });

    it('returns the right indices for two pair in any order', () => {
      expect(wh.cardsForTwoPair([
                 {suit: Suit.CLUBS, rank: Rank.TWO},
                 {suit: Suit.DIAMONDS, rank: Rank.TEN},
                 {suit: Suit.CLUBS, rank: Rank.EIGHT},
                 {suit: Suit.HEARTS, rank: Rank.TEN},
                 {suit: Suit.DIAMONDS, rank: Rank.TWO},
               ]).sort())
          .toEqual([0, 1, 3, 4]);
    });

    it('returns empty array when there is not two pair', () => {
      expect(wh.cardsForTwoPair([
                 {suit: Suit.CLUBS, rank: Rank.TWO},
                 {suit: Suit.DIAMONDS, rank: Rank.JACK},
                 {suit: Suit.CLUBS, rank: Rank.EIGHT},
                 {suit: Suit.HEARTS, rank: Rank.TEN},
                 {suit: Suit.DIAMONDS, rank: Rank.TWO},
               ]).sort())
          .toEqual([]);
    });
  });
});
