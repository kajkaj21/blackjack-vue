<script setup>
import TheToken from "./TheToken.vue";

import { useDataStore } from "../stores/data";

const data = useDataStore();

function add5s() {
  if (data.playerCash < 5) return;
  data.token5Counter++;
  addToken(5);
}
function add10s() {
  if (data.playerCash < 10) return;
  data.token10Counter++;
  addToken(10);
}
function add25s() {
  if (data.playerCash < 25) return;
  data.token25Counter++;
  addToken(25);
}
function add100s() {
  if (data.playerCash < 100) return;
  data.token100Counter++;
  addToken(100);
}

function addToken(val) {
  data.playerBet += val;
  data.playerCash -= val;
}
</script>

<template>
  <div class="tokens" v-if="!data.isPlaying">
    <TheToken
      @click="add5s"
      :borderColor="'#EB1B1B'"
      :bacCol="'#963030'"
      :value="5"
      class="token"
    ></TheToken>
    <TheToken
      @click="add10s"
      :borderColor="'#1b94eb'"
      :bacCol="'#306596'"
      :value="10"
      class="token"
    ></TheToken>
    <TheToken
      @click="add25s"
      :borderColor="'#ebd61b'"
      :bacCol="'#968c30'"
      :value="25"
      class="token"
    ></TheToken>
    <TheToken
      @click="add100s"
      :borderColor="'#901beb'"
      :bacCol="'#5d3096'"
      :value="100"
      class="token"
    ></TheToken>
  </div>
</template>

<style lang="scss" scoped>
.tokens {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
}
</style>
