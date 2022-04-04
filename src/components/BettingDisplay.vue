<script setup>
import TokensContainerUndo from "./TokensContainerUndo.vue";
import { useDataStore } from "../stores/data";
import { computed, onMounted } from "vue";

const data = useDataStore();

const checkIfPlayerHasCash = computed(() => {
  return data.playerCash > 0;
});

onMounted(() => {
  checkIfPlayerHasCash.value ? (data.gameOver = false) : (data.gameOver = true);
});

function startGame() {
  data.token5Counter = 0;
  data.token10Counter = 0;
  data.token25Counter = 0;
  data.token100Counter = 0;
  data.isPlaying = true;
}

const showUndoTokens = computed(() => {
  return data.playerBet && !data.isPlaying;
});
</script>
<template>
  <main class="betting">
    <div class="info">
      <p>Place a bet</p>
    </div>
    <div class="container">
      <div class="player-bet">
        <p>
          Your bet: <span>${{ data.playerBet }}</span>
        </p>
      </div>
      <Transition name="button">
        <button v-show="data.playerBet" @click="startGame">DEAL</button>
      </Transition>
    </div>
    <TokensContainerUndo class="tokens-container-undo"></TokensContainerUndo>
  </main>
</template>

<style lang="scss" scoped>
.betting {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 8rem;

  @media screen and (min-height: 450px) {
    gap: 0rem;
  }

  .container {
    width: 100%;
    height: 7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 1 auto;

    .player-bet {
      width: 18.2rem;
      padding: 1rem 2rem;
      border-radius: 0 9px 9px 0;
      background-color: #71a170;
      font-size: 2rem;
      color: #282828;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

      @media screen and (min-width: 800px) {
        border-radius: 9px;
      }

      span {
        font-weight: 700;
      }
    }

    button {
      cursor: pointer;
      font-family: inherit;
      background-color: #71a170;
      border: 0;
      padding: 1rem 2rem;
      border-radius: 9px;
      color: #fff;
      letter-spacing: 1px;
      font-weight: bold;
      text-align: center;
      font-size: 2rem;
      margin-right: 1rem;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;

      &:hover {
        background-color: #638d61;
      }

      &:active {
        transform: scale(0.97);
      }
    }
  }

  .info {
    align-self: center;
    margin-top: 3rem;
    padding: 3rem 6rem;
    font-size: 4rem;
    background-color: #71a170;
    border-radius: 9px;
    color: #282828;
    font-weight: 500;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    @media screen and (min-width: 800px) {
      padding: 8rem 16rem;
    }
  }

  .tokens-container-undo {
    position: absolute;
    bottom: 0;
    margin-bottom: 1.6rem;
  }
}

.button-enter-active,
.button-leave-active {
  transition: all 0.5s ease;
}

.button-enter-from,
.button-leave-to {
  transform: translateX(120%);
  opacity: 0;
}

.button-enter-to,
.button-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
</style>
