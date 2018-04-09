import {Deck, enumerateRanks, enumerateSuits, Rank, Suit} from './deck';

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
});
