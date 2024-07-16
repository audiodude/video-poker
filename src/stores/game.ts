import { defineStore } from 'pinia';
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
    deal() {
      if (this.gameState !== GameState.GAME_OVER) {
        return;
      }
      const cards = useCardsStore();
      cards.deal();
      this.gameState = GameState.DEALT;
    },
    draw() {
      if (this.gameState !== GameState.DEALT) {
        return;
      }
      const cards = useCardsStore();
      cards.draw();
      this.gameState = GameState.DRAWN;
    },
    finalize() {
      const cards = useCardsStore();
      cards.dealt = [];
      cards.held = [];
      cards.drawn = [];
      this.gameState = GameState.GAME_OVER;
    },
  },
});
