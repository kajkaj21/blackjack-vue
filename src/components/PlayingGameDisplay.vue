<script setup>
import TheCard from "./TheCard.vue";

import { useCardsStore } from "../stores/cards";
import { useDataStore } from "../stores/data";
import { ref, computed, reactive } from "vue";

const cardsStore = useCardsStore();
const dataStore = useDataStore();

const isPlaying = ref(false);
const gameOver = ref(false);
const result = ref(null);

const playerCards = reactive([getCard(), getCard()]);
const playerCardsValue = computed(() => {
  const sum = playerCards.map((card) => card.value).reduce((a, b) => a + b, 0);
  if (sum <= 21) return sum;
  else {
    return playerCards
      .map((card) => card.value)
      .map((val) => (val === 11 ? 1 : val))
      .reduce((a, b) => a + b, 0);
  }
});

const dealerCards = reactive([getCard(), getCard()]);
const dealerFirstCard = computed(() => {
  return dealerCards[0].value;
});
const dealerCardsValue = computed(() => {
  const sum = dealerCards.map((card) => card.value).reduce((a, b) => a + b, 0);
  if (sum <= 21) return sum;
  else {
    return dealerCards
      .map((card) => card.value)
      .map((val) => (val === 11 ? 1 : val))
      .reduce((a, b) => a + b, 0);
  }
});

function getRandomElementFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];
  return item;
}

function getCard() {
  const card = getRandomElementFromArray(cardsStore.cards);
  return card;
}

function checkIfPlayerHasOver21() {
  if (playerCardsValue.value > 21) {
    isPlaying.value = true;
    result.value = "You have lost";
    dataStore.playerBet = 0;
    gameOver.value = true;
    flipDealerUnknownCard();
    return;
  }
}

function playerHand() {
  dataStore.canUseDoubleDown = false;
  const card = getCard();
  playerCards.push(card);
  if (playerCardsValue.value === 21) {
    playerStand();
    return;
  } else {
    checkIfPlayerHasOver21();
  }
}

function doubleDown() {
  dataStore.playerCash -= dataStore.playerBet;
  dataStore.playerBet *= 2;
  const card = getCard();
  playerCards.push(card);
  if (playerCardsValue.value > 21) {
    isPlaying.value = true;
    result.value = "You have lost";
    dataStore.playerBet = 0;
    gameOver.value = true;
    flipDealerUnknownCard();
    return;
  } else {
    playerStand();
  }
}

const canUseDoubleDown = computed(() => {
  return (
    dataStore.canUseDoubleDown && dataStore.playerCash >= dataStore.playerBet
  );
});

function playerStand() {
  isPlaying.value = true;
  flipDealerUnknownCard();
  dealerDrawsCards();
  checkWinner();
}

function dealerDrawsCards() {
  while (dealerCardsValue.value < 17) {
    const card = getCard();
    dealerCards.push(card);
  }
}

function flipDealerUnknownCard() {
  setTimeout(() => {
    document.querySelector(
      ".dealer-cards"
    ).firstChild.children[1].style.transform = "none";
  }, 125);
}

function checkWinner() {
  setTimeout(() => {
    if (playerCardsValue.value > 21) {
      result.value = "You have lost";
      dataStore.playerBet = 0;
      return;
    } else if (playerCardsValue.value === dealerCardsValue.value) {
      result.value = "Push";
      dataStore.playerCash += dataStore.playerBet;
      dataStore.playerBet = 0;
      return;
    } else if (
      playerCardsValue.value > dealerCardsValue.value ||
      dealerCardsValue.value > 21
    ) {
      result.value = "You have won";
      dataStore.playerCash += dataStore.playerBet * 2;
      dataStore.playerBet = 0;
      return;
    } else {
      result.value = "You have lost";
      dataStore.playerBet = 0;
      return;
    }
  }, 1500);
}

function newGame() {
  isPlaying.value = false;
  dataStore.isPlaying = false;
  dataStore.canUseDoubleDown = true;
  result.value = null;
}

function checkIfBlackjack() {
  result.value = null;
  if (playerCardsValue.value === 21) {
    result.value = "blackjack";
    setTimeout(() => {
      isPlaying.value = true;
      document.querySelector(
        ".dealer-cards"
      ).firstElementChild.lastElementChild.style.transform = "rotateY(0deg)";
      if (playerCardsValue.value > dealerCardsValue.value) {
        result.value = "You have won";
        (dataStore.playerBet * 2.5) % 1 !== 0
          ? (dataStore.playerCash += dataStore.playerBet * 2)
          : (dataStore.playerCash += dataStore.playerBet * 2.5);

        dataStore.playerBet = 0;
      } else {
        result.value = "Push";
        dataStore.playerCash += dataStore.playerBet;
        dataStore.playerBet = 0;
      }
    }, 2000);
  }
}
setTimeout(() => {
  checkIfBlackjack();
}, 1);
</script>

<template>
  <main class="playing">
    <div class="cards-container">
      <div class="dealer-cards">
        <TransitionGroup tag="ul" name="dealer-cards" appear>
          <TheCard
            v-for="(card, id) in dealerCards"
            :key="id"
            :cardURL="card"
            class="card"
            :style="{ '--id': id }"
          ></TheCard>
        </TransitionGroup>
      </div>
      <div class="action-container">
        <Transition name="scores" appear>
          <div class="scores">
            <div class="dealer-score">
              <p>
                <span v-if="!isPlaying">{{ dealerFirstCard }}</span>
                <span v-else>{{ dealerCardsValue }}</span> Dealer
              </p>
            </div>

            <div class="player-score">
              <p>
                <span>{{ playerCardsValue }}</span> Player
              </p>
            </div>
          </div>
        </Transition>

        <Transition name="result">
          <div v-if="result" class="result-container">
            <p>{{ result }}</p>
          </div>
        </Transition>
        <div class="buttons" v-if="!isPlaying">
          <Transition name="btn" appear>
            <button
              v-show="canUseDoubleDown"
              class="btn btn-double-down"
              @click="doubleDown"
            >
              DOUBLE
            </button>
          </Transition>
          <Transition name="btn" appear>
            <button class="btn btn-hit" @click="playerHand">HIT</button>
          </Transition>
          <Transition name="btn" appear>
            <button class="btn btn-stand" @click="playerStand">STAND</button>
          </Transition>
        </div>
        <div class="new-game" v-else>
          <Transition name="new-game" appear>
            <button class="btn" @click="newGame">New Game</button>
          </Transition>
        </div>
      </div>
      <div class="player-cards">
        <TransitionGroup tag="ul" name="player-cards" appear>
          <TheCard
            v-for="(card, id) in playerCards"
            :key="id"
            :cardURL="card"
            class="card"
          ></TheCard>
        </TransitionGroup>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.playing {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  position: relative;
  padding: 2rem 0;

  .cards-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8rem;

    .dealer-cards {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;

      ul {
        list-style-type: none;
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        flex-wrap: wrap;

        .card:nth-child(2) {
          transform: rotateY(180deg);
        }
      }
    }

    .action-container {
      width: 100%;
      min-height: 8.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 0 1rem;

      @media screen and (min-width: 600px) {
        min-height: 13rem;
      }
      @media screen and (min-width: 800px) {
        min-height: 18rem;
      }

      .buttons {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        gap: 1.2rem;
        .btn {
          cursor: pointer;
          padding: 0.5rem 1rem;
          font-family: inherit;
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          background-color: #71a170;
          border: 0;
          border-radius: 9px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;

          &:hover {
            background-color: #638d61;
          }

          &:active {
            transform: scale(0.97);
          }

          &.btn-double-down {
            grid-row: 1;
          }
          &.btn-hit {
            grid-row: 2;
          }
          &.btn-stand {
            grid-row: 3;
          }
        }
      }

      .new-game {
        .btn {
          width: 8rem;
          cursor: pointer;
          padding: 0.5rem 1rem;
          font-family: inherit;
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          background-color: #71a170;
          border: 0;
          border-radius: 9px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;

          @media screen and (min-width: 1000px) {
            height: 8rem;
            width: 12rem;
          }

          &:hover {
            background-color: #638d61;
          }

          &:active {
            transform: scale(0.97);
          }
        }
      }

      .scores {
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        color: #ffffff;

        .player-score,
        .dealer-score {
          span {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 3rem;
            width: 3rem;
            padding: 0.5rem;
            background-color: #71a170;
            color: #282828;
            border-radius: 50%;
            font-weight: 700;

            @media screen and (min-width: 900px) {
              display: inline-flex;
            }
          }
        }
      }

      .result-container {
        width: 16rem;
        height: 8rem;
        background-color: #71a170;
        border-radius: 9px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 12px 5px rgba(0, 0, 0, 0.2);

        @media screen and (min-width: 600px) {
          height: 13rem;
          width: 35rem;
        }

        @media screen and (min-width: 800px) {
          height: 18rem;
          width: 45rem;
        }

        p {
          font-size: 2.4rem;
          font-weight: 700;
          text-align: center;
          padding: 1rem;
        }
      }
    }

    .player-cards {
      ul {
        list-style-type: none;
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
    }
  }

  .scores-enter-active,
  .scores-leave-active {
    transition: all 0.5s ease;
  }

  .scores-enter-from,
  .scores-leave-to {
    transform: translateX(-120%);
    opacity: 0;
  }

  .scores-leave-from,
  .scores-enter-to {
    opacity: 1;
  }

  .btn-enter-active,
  .btn-leave-active {
    transition: all 0.5s ease;
  }

  .btn-enter-from,
  .btn-leave-to {
    transform: translateX(120%);
    opacity: 0;
  }

  .btn-leave-from,
  .btn-enter-to {
    opacity: 1;
  }

  .new-game-enter-active,
  .new-game-leave-active {
    transition: all 0.5s ease;
  }

  .new-game-enter-from,
  .new-game-leave-to {
    transform: translateX(120%);
    opacity: 0;
  }

  .new-game-leave-from,
  .new-game-enter-to {
    opacity: 1;
  }

  .dealer-cards-enter-active,
  .dealer-cards-leave-active {
    transition: transform 1s ease;
    transition-delay: calc(0.25s * var(--id));
  }

  .dealer-cards-enter-from,
  .dealer-cards-leave-to {
    transform: translateY(-220%);
  }

  .player-cards-enter-active,
  .player-cards-leave-active {
    transition: transform 1s ease;
  }

  .player-cards-enter-from,
  .player-cards-leave-to {
    transform: translateY(120%);
  }

  .result-enter-active,
  .result-leave-active {
    transition: opacity 1s ease;
  }

  .result-enter-from,
  .result-leave-to {
    opacity: 0;
  }

  .result-enter-to,
  .result-leave-from {
    opacity: 1;
  }
}
</style>
