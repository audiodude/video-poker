import {Rank, Suit} from './deck';
import * as nwh from './non_winning_hands';

describe('non_winning_hands module', () => {
  describe('bestCardsToHold', () => {
    it('returns the right indices for 3 to a flush', () => {
      expect(nwh.bestCardsToHold([
        {suit: Suit.CLUBS, rank: Rank.NINE},
        {suit: Suit.DIAMONDS, rank: Rank.ACE},
        {suit: Suit.CLUBS, rank: Rank.THREE},
        {suit: Suit.CLUBS, rank: Rank.TEN},
        {suit: Suit.SPADES, rank: Rank.JACK},
      ])).toEqual([1, 4]);
    });
  });

  describe('cardsForAFlush', () => {
    it('returns true when there is four to a flush', () => {
      expect(nwh.cardsForAFlush(
                 [
                   {suit: Suit.SPADES, rank: Rank.ACE},
                   {suit: Suit.SPADES, rank: Rank.KING},
                   {suit: Suit.HEARTS, rank: Rank.QUEEN},
                   {suit: Suit.SPADES, rank: Rank.JACK},
                   {suit: Suit.SPADES, rank: Rank.TEN},
                 ],
                 4))
          .toEqual([0, 1, 3, 4]);
    });

    it('returns true when there is four to a different flush', () => {
      expect(nwh.cardsForAFlush(
                 [
                   {suit: Suit.HEARTS, rank: Rank.ACE},
                   {suit: Suit.HEARTS, rank: Rank.TWO},
                   {suit: Suit.HEARTS, rank: Rank.QUEEN},
                   {suit: Suit.SPADES, rank: Rank.JACK},
                   {suit: Suit.HEARTS, rank: Rank.SEVEN},
                 ],
                 4))
          .toEqual([0, 1, 2, 4]);
    });

    it('returns false when there is not four to a flush', () => {
      expect(nwh.cardsForAFlush(
                 [
                   {suit: Suit.HEARTS, rank: Rank.ACE},
                   {suit: Suit.SPADES, rank: Rank.TWO},
                   {suit: Suit.HEARTS, rank: Rank.QUEEN},
                   {suit: Suit.SPADES, rank: Rank.JACK},
                   {suit: Suit.HEARTS, rank: Rank.SEVEN},
                 ],
                 4))
          .toEqual([]);
    });
  });

  describe('cardsForARoyal', () => {
    describe('4 to a royal', () => {
      it('returns indices when there is four to a royal', () => {
        expect(nwh.cardsForARoyal(
                      [
                        {suit: Suit.SPADES, rank: Rank.ACE},
                        {suit: Suit.SPADES, rank: Rank.KING},
                        {suit: Suit.SPADES, rank: Rank.QUEEN},
                        {suit: Suit.SPADES, rank: Rank.JACK},
                        {suit: Suit.DIAMONDS, rank: Rank.TEN},
                      ],
                      4)
                   .sort())
            .toEqual([0, 1, 2, 3]);
      });

      it('returns indices when there is a pat flush and four to a royal',
         () => {
           expect(nwh.cardsForARoyal(
                         [
                           {suit: Suit.SPADES, rank: Rank.ACE},
                           {suit: Suit.SPADES, rank: Rank.KING},
                           {suit: Suit.SPADES, rank: Rank.QUEEN},
                           {suit: Suit.SPADES, rank: Rank.JACK},
                           {suit: Suit.SPADES, rank: Rank.TWO},
                         ],
                         4)
                      .sort())
               .toEqual([0, 1, 2, 3]);
         });

      it('returns indices when there is a different four to a royal', () => {
        expect(nwh.cardsForARoyal(
                      [
                        {suit: Suit.SPADES, rank: Rank.QUEEN},
                        {suit: Suit.SPADES, rank: Rank.JACK},
                        {suit: Suit.SPADES, rank: Rank.ACE},
                        {suit: Suit.DIAMONDS, rank: Rank.TEN},
                        {suit: Suit.SPADES, rank: Rank.KING},
                      ],
                      4)
                   .sort())
            .toEqual([0, 1, 2, 4]);
      });

      it('returns empty when there is not four to a royal', () => {
        expect(nwh.cardsForARoyal(
                      [
                        {suit: Suit.SPADES, rank: Rank.NINE},
                        {suit: Suit.SPADES, rank: Rank.JACK},
                        {suit: Suit.SPADES, rank: Rank.ACE},
                        {suit: Suit.DIAMONDS, rank: Rank.TEN},
                        {suit: Suit.SPADES, rank: Rank.KING},
                      ],
                      4)
                   .sort())
            .toEqual([]);
      });
    });
    describe('3 to a royal', () => {
      it('returns indices when there is three to a royal', () => {
        expect(nwh.cardsForARoyal(
                      [
                        {suit: Suit.SPADES, rank: Rank.ACE},
                        {suit: Suit.SPADES, rank: Rank.KING},
                        {suit: Suit.SPADES, rank: Rank.QUEEN},
                        {suit: Suit.CLUBS, rank: Rank.JACK},
                        {suit: Suit.DIAMONDS, rank: Rank.TEN},
                      ],
                      3)
                   .sort())
            .toEqual([0, 1, 2]);
      });

      it('returns indices when there is a pat flush and four to a royal',
         () => {
           expect(nwh.cardsForARoyal(
                         [
                           {suit: Suit.SPADES, rank: Rank.ACE},
                           {suit: Suit.SPADES, rank: Rank.KING},
                           {suit: Suit.SPADES, rank: Rank.QUEEN},
                           {suit: Suit.SPADES, rank: Rank.THREE},
                           {suit: Suit.SPADES, rank: Rank.TWO},
                         ],
                         3)
                      .sort())
               .toEqual([0, 1, 2]);
         });

      it('returns indices when there is a different three to a royal', () => {
        expect(nwh.cardsForARoyal(
                      [
                        {suit: Suit.SPADES, rank: Rank.QUEEN},
                        {suit: Suit.SPADES, rank: Rank.JACK},
                        {suit: Suit.DIAMONDS, rank: Rank.ACE},
                        {suit: Suit.DIAMONDS, rank: Rank.TEN},
                        {suit: Suit.SPADES, rank: Rank.KING},
                      ],
                      3)
                   .sort())
            .toEqual([0, 1, 4]);
      });

      it('returns empty when there is not three to a royal', () => {
        expect(nwh.cardsForARoyal(
                      [
                        {suit: Suit.SPADES, rank: Rank.NINE},
                        {suit: Suit.SPADES, rank: Rank.JACK},
                        {suit: Suit.DIAMONDS, rank: Rank.ACE},
                        {suit: Suit.DIAMONDS, rank: Rank.TEN},
                        {suit: Suit.SPADES, rank: Rank.KING},
                      ],
                      3)
                   .sort())
            .toEqual([]);
      });
    });
  });

  describe('cardsForFourToAStraightFlush', () => {
    it('returns indices when there is four to a straight flush', () => {
      expect(nwh.cardsForFourToAStraightFlush([
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.SPADES, rank: Rank.KING},
                  {suit: Suit.DIAMONDS, rank: Rank.TWO},
                  {suit: Suit.SPADES, rank: Rank.JACK},
                  {suit: Suit.SPADES, rank: Rank.TEN},
                ])
                 .sort())
          .toEqual([0, 1, 3, 4]);
    });

    it('returns indices when there is a different four to a straight flush',
       () => {
         expect(nwh.cardsForFourToAStraightFlush([
                     {suit: Suit.SPADES, rank: Rank.JACK},
                     {suit: Suit.SPADES, rank: Rank.TEN},
                     {suit: Suit.SPADES, rank: Rank.EIGHT},
                     {suit: Suit.SPADES, rank: Rank.QUEEN},
                     {suit: Suit.DIAMONDS, rank: Rank.TWO},
                   ])
                    .sort())
             .toEqual([0, 1, 2, 3]);
       });

    it('returns indices when there is a pat flush and four to a straight flush',
       () => {
         expect(nwh.cardsForFourToAStraightFlush([
                     {suit: Suit.SPADES, rank: Rank.NINE},
                     {suit: Suit.SPADES, rank: Rank.KING},
                     {suit: Suit.SPADES, rank: Rank.TWO},
                     {suit: Suit.SPADES, rank: Rank.JACK},
                     {suit: Suit.SPADES, rank: Rank.TEN},
                   ])
                    .sort())
             .toEqual([0, 1, 3, 4]);
       });

    it('returns empty when there not four to a straight flush', () => {
      expect(nwh.cardsForFourToAStraightFlush([
        {suit: Suit.SPADES, rank: Rank.NINE},
        {suit: Suit.SPADES, rank: Rank.KING},
        {suit: Suit.SPADES, rank: Rank.TWO},
        {suit: Suit.SPADES, rank: Rank.JACK},
        {suit: Suit.DIAMONDS, rank: Rank.TEN},
      ])).toEqual([]);
    });
  });

  describe('cardsForFourToAnOutsideStraight', () => {
    it('returns the right indices for four to an outside straight', () => {
      expect(nwh.cardsForFourToAnOutsideStraight([
                  {suit: Suit.DIAMONDS, rank: Rank.ACE},
                  {suit: Suit.CLUBS, rank: Rank.JACK},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.QUEEN},
                ])
                 .sort())
          .toEqual([1, 2, 3, 4]);
    });

    it('returns the right indices when there are multiple options', () => {
      expect(nwh.cardsForFourToAnOutsideStraight([
                  {suit: Suit.DIAMONDS, rank: Rank.NINE},
                  {suit: Suit.CLUBS, rank: Rank.JACK},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.QUEEN},
                ])
                 .sort())
          .toEqual([0, 1, 3, 4]);
    });

    it('returns empty array when there is not four to an outside straight',
       () => {
         expect(nwh.cardsForFourToAnOutsideStraight([
                     {suit: Suit.DIAMONDS, rank: Rank.KING},
                     {suit: Suit.CLUBS, rank: Rank.JACK},
                     {suit: Suit.SPADES, rank: Rank.NINE},
                     {suit: Suit.HEARTS, rank: Rank.TEN},
                     {suit: Suit.SPADES, rank: Rank.TWO},
                   ])
                    .sort())
             .toEqual([]);
       });
  });

  describe('cardsForTwoSuitedHighCards', () => {
    it('returns the right indices for two suited high cards', () => {
      expect(nwh.cardsForTwoSuitedHighCards([
                  {suit: Suit.DIAMONDS, rank: Rank.TWO},
                  {suit: Suit.SPADES, rank: Rank.JACK},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.QUEEN},
                ])
                 .sort())
          .toEqual([1, 4]);
    });

    it('returns empty array when there are not two suited high cards', () => {
      expect(nwh.cardsForTwoSuitedHighCards([
                  {suit: Suit.DIAMONDS, rank: Rank.KING},
                  {suit: Suit.CLUBS, rank: Rank.JACK},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.TWO},
                ])
                 .sort())
          .toEqual([]);
    });
  });

  describe('cardsForThreeToAStraightFlush', () => {
    it('returns the right indices for three to a straight flush with two gaps',
       () => {
         expect(nwh.cardsForThreeToAStraightFlush([
                     {suit: Suit.DIAMONDS, rank: Rank.TWO},
                     {suit: Suit.DIAMONDS, rank: Rank.THREE},
                     {suit: Suit.DIAMONDS, rank: Rank.SIX},
                     {suit: Suit.HEARTS, rank: Rank.TEN},
                     {suit: Suit.SPADES, rank: Rank.QUEEN},
                   ])
                    .sort())
             .toEqual([0, 1, 2]);
       });

    it('returns the right indices for three to a straight flush with one gap',
       () => {
         expect(nwh.cardsForThreeToAStraightFlush([
                     {suit: Suit.DIAMONDS, rank: Rank.TWO},
                     {suit: Suit.DIAMONDS, rank: Rank.THREE},
                     {suit: Suit.HEARTS, rank: Rank.TEN},
                     {suit: Suit.SPADES, rank: Rank.QUEEN},
                     {suit: Suit.DIAMONDS, rank: Rank.FIVE},
                   ])
                    .sort())
             .toEqual([0, 1, 4]);
       });

    it('returns the right indices in any order', () => {
      expect(nwh.cardsForThreeToAStraightFlush([
                  {suit: Suit.DIAMONDS, rank: Rank.FIVE},
                  {suit: Suit.DIAMONDS, rank: Rank.THREE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.QUEEN},
                  {suit: Suit.DIAMONDS, rank: Rank.TWO},
                ])
                 .sort())
          .toEqual([0, 1, 4]);
    });

    it('returns empty when there is not three to a straight flush', () => {
      expect(nwh.cardsForThreeToAStraightFlush([
                  {suit: Suit.DIAMONDS, rank: Rank.FIVE},
                  {suit: Suit.CLUBS, rank: Rank.THREE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.QUEEN},
                  {suit: Suit.DIAMONDS, rank: Rank.TWO},
                ])
                 .sort())
          .toEqual([]);
    });
  });

  describe('cardsForTwoUnsuitedHighCards', () => {
    it('returns the right indices for two unsuited high cards', () => {
      expect(nwh.cardsForTwoUnsuitedHighCards([
                  {suit: Suit.DIAMONDS, rank: Rank.TWO},
                  {suit: Suit.DIAMONDS, rank: Rank.JACK},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.QUEEN},
                ])
                 .sort())
          .toEqual([1, 4]);
    });

    it('returns the lowest indices for two unsuited high cards', () => {
      expect(nwh.cardsForTwoUnsuitedHighCards([
                  {suit: Suit.DIAMONDS, rank: Rank.TWO},
                  {suit: Suit.DIAMONDS, rank: Rank.JACK},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.ACE},
                  {suit: Suit.SPADES, rank: Rank.QUEEN},
                ])
                 .sort())
          .toEqual([1, 4]);
    });

    it('returns empty array when there are not two unsuited high cards', () => {
      expect(nwh.cardsForTwoUnsuitedHighCards([
                  {suit: Suit.DIAMONDS, rank: Rank.KING},
                  {suit: Suit.CLUBS, rank: Rank.THREE},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.TWO},
                ])
                 .sort())
          .toEqual([]);
    });
  });

  describe('cardsForSuitedTenX', () => {
    it('returns the right indices for suited ten/jack', () => {
      expect(nwh.cardsForSuitedTenX([
                  {suit: Suit.DIAMONDS, rank: Rank.TEN},
                  {suit: Suit.DIAMONDS, rank: Rank.JACK},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.TWO},
                ])
                 .sort())
          .toEqual([0, 1]);
    });

    it('returns the right indices for suited ten/queen', () => {
      expect(nwh.cardsForSuitedTenX([
                  {suit: Suit.DIAMONDS, rank: Rank.QUEEN},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.DIAMONDS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.TWO},
                ])
                 .sort())
          .toEqual([0, 3]);
    });

    it('returns the right indices for suited ten/king', () => {
      expect(nwh.cardsForSuitedTenX([
                  {suit: Suit.DIAMONDS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.TWO},
                  {suit: Suit.DIAMONDS, rank: Rank.KING},
                ])
                 .sort())
          .toEqual([0, 4]);
    });

    it('returns empty array when there are not two unsuited high cards', () => {
      expect(nwh.cardsForSuitedTenX([
                  {suit: Suit.DIAMONDS, rank: Rank.KING},
                  {suit: Suit.CLUBS, rank: Rank.THREE},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.TWO},
                ])
                 .sort())
          .toEqual([]);
    });
  });

  describe('cardsForOneHighCard', () => {
    it('returns the right indices for one high card', () => {
      expect(nwh.cardsForOneHighCard([
                  {suit: Suit.DIAMONDS, rank: Rank.TWO},
                  {suit: Suit.DIAMONDS, rank: Rank.SIX},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.QUEEN},
                ])
                 .sort())
          .toEqual([4]);
    });

    it('returns empty array when there are no high cards', () => {
      expect(nwh.cardsForOneHighCard([
                  {suit: Suit.DIAMONDS, rank: Rank.SIX},
                  {suit: Suit.CLUBS, rank: Rank.THREE},
                  {suit: Suit.SPADES, rank: Rank.NINE},
                  {suit: Suit.HEARTS, rank: Rank.TEN},
                  {suit: Suit.SPADES, rank: Rank.TWO},
                ])
                 .sort())
          .toEqual([]);
    });
  });
});
