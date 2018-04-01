import {Deck, enumerateRanks, enumerateSuits, isJacksOrBetter, isThreeOfAKind, isTwoPair, Rank, Suit} from './deck';

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

  describe('isJacksOrBetter', () => {
    it('returns true for a pair of aces', () => {
      expect(isJacksOrBetter([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.ACE,
        },
        {
          suit: Suit.HEARTS,
          rank: Rank.ACE,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.TWO,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
      ])).toBe(true);
    });

    it('does not matter the order for a pair of aces', () => {
      expect(isJacksOrBetter([
        {
          suit: Suit.CLUBS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.HEARTS,
          rank: Rank.ACE,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.TWO,
        },
        {
          suit: Suit.DIAMONDS,
          rank: Rank.ACE,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
      ])).toBe(true);
    });

    it('returns true for a pair of kings', () => {
      expect(isJacksOrBetter([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.KING,
        },
        {
          suit: Suit.HEARTS,
          rank: Rank.KING,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.TWO,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
      ])).toBe(true);
    });

    it('returns true for a pair of queens', () => {
      expect(isJacksOrBetter([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.QUEEN,
        },
        {
          suit: Suit.HEARTS,
          rank: Rank.QUEEN,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.TWO,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
      ])).toBe(true);
    });

    it('returns true for a pair of jacks', () => {
      expect(isJacksOrBetter([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.JACK,
        },
        {
          suit: Suit.HEARTS,
          rank: Rank.JACK,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.TWO,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
      ])).toBe(true);
    });

    it('returns false for a pair of tens', () => {
      expect(isJacksOrBetter([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.TEN,
        },
        {
          suit: Suit.HEARTS,
          rank: Rank.TEN,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.TWO,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
      ])).toBe(false);
    });
  });

  describe('isTwoPair', () => {
    it('returns true for a pair of tens and a pair of twos', () => {
      expect(isTwoPair([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.TEN,
        },
        {
          suit: Suit.HEARTS,
          rank: Rank.TEN,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.TWO,
        },
        {
          suit: Suit.DIAMONDS,
          rank: Rank.TWO,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
      ])).toBe(true);
    });

    it('in any order for a pair of tens and a pair of twos', () => {
      expect(isTwoPair([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.TEN,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.TWO,
        },
        {
          suit: Suit.DIAMONDS,
          rank: Rank.TWO,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
        {
          suit: Suit.HEARTS,
          rank: Rank.TEN,
        },
      ])).toBe(true);
    });

    it('does not return true when there is not two pair', () => {
      expect(isTwoPair([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.TEN,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.ACE,
        },
        {
          suit: Suit.DIAMONDS,
          rank: Rank.TWO,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
        {
          suit: Suit.SPADES,
          rank: Rank.TEN,
        },
      ])).toBe(false);
    });
  });

  describe('isThreeOfAKind', () => {
    it('returns true for three sixes', () => {
      expect(isThreeOfAKind([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.SPADES,
          rank: Rank.SIX,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
        {
          suit: Suit.SPADES,
          rank: Rank.TEN,
        },
      ])).toBe(true);
    });

    it('in any order for three sixes', () => {
      expect(isThreeOfAKind([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.SPADES,
          rank: Rank.SIX,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
        {
          suit: Suit.SPADES,
          rank: Rank.TEN,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.SIX,
        },
      ])).toBe(true);
    });

    it('does not return true when there is not three of a kind', () => {
      expect(isThreeOfAKind([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.SPADES,
          rank: Rank.SIX,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
        {
          suit: Suit.SPADES,
          rank: Rank.TEN,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.ACE,
        },
      ])).toBe(false);
    });
  });

  describe('isThreeOfAKind', () => {
    it('returns true for three sixes', () => {
      expect(isThreeOfAKind([
        {
          suit: Suit.DIAMONDS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.SIX,
        },
        {
          suit: Suit.SPADES,
          rank: Rank.SIX,
        },
        {
          suit: Suit.CLUBS,
          rank: Rank.EIGHT,
        },
        {
          suit: Suit.SPADES,
          rank: Rank.TEN,
        },
      ])).toBe(true);
    });
  });
});
