import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      playerCash: 1000,
      playerBet: 0,
      token5Counter: 0,
      token10Counter: 0,
      token25Counter: 0,
      token100Counter: 0,
      isPlaying: false,
      gameOver: false,
      canUseDoubleDown: true,
    };
  },
});
