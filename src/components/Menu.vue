<script setup>
import TokensContainer from "./TokensContainerMenu.vue";

import { useDataStore } from "../stores/data";
import { computed } from "vue";

const data = useDataStore();

const playerCash = computed(() => {
  return data.playerCash;
});
const playerBet = computed(() => {
  return data.playerBet;
});
const isPlaying = computed(() => {
  return data.isPlaying;
});
</script>

<template>
  <div class="menu-container">
    <TokensContainer></TokensContainer>
    <div class="cash">
      <p v-show="isPlaying">
        Current Bet:
        <span> ${{ playerBet }} </span>
      </p>
      <p>
        Available Cash:
        <span> ${{ playerCash }} </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2em;

  .cash {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 1.2rem;
    background-color: #71a170;
    text-align: center;
    padding: 2rem 1rem;
    color: #282828;
    font-size: 2rem;
    border-radius: 9px 9px 0 0;
    box-shadow: 0 4px 12px 5px rgba(0, 0, 0, 0.2);

    p {
      display: flex;
      flex-direction: column;
    }

    & p:nth-child(2) {
      grid-column: 2;
    }

    span {
      font-weight: 700;
    }
  }
}
</style>
