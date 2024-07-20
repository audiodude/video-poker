import { defineStore } from 'pinia';

import { Card } from '@/lib/card';
import { useCardsStore } from './cards';

export enum GameState {
  GAME_OVER,
  DEALT,
  DRAWN,
}

export const useGameStore = defineStore('game', {
  state: () => ({
    gameState: GameState.GAME_OVER,
  }),
  actions: {
    next() {
      const cards = useCardsStore();
      switch (this.gameState) {
        case GameState.GAME_OVER:
          cards.deal();
          this.gameState = GameState.DEALT;
          break;
        case GameState.DEALT:
          cards.draw();
          this.gameState = GameState.DRAWN;
          break;
        case GameState.DRAWN:
          this.finalize();
          this.gameState = GameState.GAME_OVER;
          break;
      }
    },
    finalize() {
      const cards = useCardsStore();
      cards.dealt = [];
      cards.held = [];
      cards.drawn = [];
      this.gameState = GameState.GAME_OVER;
    },
  },
  getters: {
    currentCards(): Card[] {
      const cards = useCardsStore();

      if (cards.dealt.length === 0) {
        return Array(5).fill(new Card('x', 'x'));
      }

      function drawResultCards(): Card[] {
        const ans = Array(5);
        let drawIdx = 0;
        for (let i = 0; i < 5; i++) {
          if (cards.held.indexOf(cards.dealt[i]) !== -1) {
            ans[i] = cards.dealt[i];
          } else {
            ans[i] = cards.drawn[drawIdx];
            drawIdx++;
          }
        }
        return ans;
      }

      switch (this.gameState) {
        case GameState.GAME_OVER:
          return drawResultCards();
        case GameState.DEALT:
          return cards.dealt;
        case GameState.DRAWN:
          return drawResultCards();
      }
    },
  },
});
