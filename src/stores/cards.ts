import { defineStore } from 'pinia';
import { Card } from '@/lib/card';

function createDeck() {
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  const suits = ['s', 'h', 'd', 'c'];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(new Card(rank, suit));
    }
  }

  return deck;
}

// From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

export const useCardsStore = defineStore('cards', {
  state: () => ({
    deck: createDeck(),
    dealt: [] as Card[],
    held: [] as Card[],
    drawn: [] as Card[],
  }),
  actions: {
    deal() {
      shuffle(this.deck);
      this.dealt = this.deck.splice(0, 5);
    },
    draw() {
      const num = 5 - this.held.length;
      this.drawn = this.deck.splice(0, num);
    },
  },
});
