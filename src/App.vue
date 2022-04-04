<script setup>
import Menu from "./components/Menu.vue";
import BettingDisplay from "./components/BettingDisplay.vue";
import PlayingGameDisplay from "./components/PlayingGameDisplay.vue";
import NoCash from "./components/NoCash.vue";

import { useDataStore } from "./stores/data";
import { computed } from "vue";

const data = useDataStore();

const checkIfGameOver = computed(() => {
  return data.gameOver;
});
</script>

<template>
  <div class="app">
    <BettingDisplay v-if="!data.isPlaying"></BettingDisplay>
    <PlayingGameDisplay v-else></PlayingGameDisplay>
    <Teleport to="body">
      <NoCash v-if="checkIfGameOver" class="no-cash"></NoCash>
    </Teleport>
    <Menu></Menu>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
  font-family: "Roboto", sans-serif;
}

.app {
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  background-color: #395a38;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 800px) {
    padding: 0 10vw;
  }
  @media screen and (min-width: 1000px) {
    padding: 0 15vw;
  }
  @media screen and (min-width: 1200px) {
    padding: 0 20vw;
  }
}
</style>
