<script setup>
import TheToken from "./TheToken.vue";

import { useDataStore } from "../stores/data";
import { computed } from "vue";

const data = useDataStore();

function remove5s() {
  if (data.token5Counter <= 0) return;
  data.token5Counter--;
  removeToken(5);
}
function remove10s() {
  if (data.token10Counter <= 0) return;
  data.token10Counter--;
  removeToken(10);
}
function remove25s() {
  if (data.token25Counter <= 0) return;
  data.token25Counter--;
  removeToken(25);
}
function remove100s() {
  if (data.token100Counter <= 0) return;
  data.token100Counter--;
  removeToken(100);
}

function removeToken(val) {
  data.playerBet -= val;
  data.playerCash += val;
}

const currentTokens5 = computed(() => {
  return data.token5Counter;
});
const currentTokens10 = computed(() => {
  return data.token10Counter;
});
const currentTokens25 = computed(() => {
  return data.token25Counter;
});
const currentTokens100 = computed(() => {
  return data.token100Counter;
});
</script>

<template>
  <div class="tokens">
    <Transition name="token" appear>
      <div class="token-container" v-show="currentTokens5">
        <p>{{ currentTokens5 }}</p>
        <TheToken
          @click="remove5s"
          :borderColor="'#EB1B1B'"
          :bacCol="'#963030'"
          :value="5"
          class="token"
        ></TheToken>
      </div>
    </Transition>
    <Transition name="token" appear>
      <div class="token-container" v-show="currentTokens10">
        <p>{{ currentTokens10 }}</p>
        <TheToken
          @click="remove10s"
          :borderColor="'#1b94eb'"
          :bacCol="'#306596'"
          :value="10"
          class="token"
        ></TheToken>
      </div>
    </Transition>
    <Transition name="token" appear>
      <div class="token-container" v-show="currentTokens25">
        <p>{{ currentTokens25 }}</p>
        <TheToken
          @click="remove25s"
          :borderColor="'#ebd61b'"
          :bacCol="'#968c30'"
          :value="25"
          class="token"
        ></TheToken>
      </div>
    </Transition>
    <Transition name="token" appear>
      <div class="token-container" v-show="currentTokens100">
        <p>{{ currentTokens100 }}</p>
        <TheToken
          @click="remove100s"
          :borderColor="'#901beb'"
          :bacCol="'#5d3096'"
          :value="100"
          class="token"
        ></TheToken>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.tokens {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;

  .token-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;

    &:nth-child(1) {
      grid-column: 1;
    }
    &:nth-child(2) {
      grid-column: 2;
    }
    &:nth-child(3) {
      grid-column: 3;
    }
    &:nth-child(4) {
      grid-column: 4;
    }

    p {
      font-size: 2rem;
      font-weight: 700;
      color: #282828;
      user-select: none;
    }
  }
}

.token-enter-active,
.token-leave-active {
  transition: all 0.2s ease-in-out;
}

.token-enter-from,
.token-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.token-enter-to,
.token-leave-from {
  transform: translateY(0%);
  opacity: 1;
}
</style>
