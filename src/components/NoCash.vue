<script setup>
import { useDataStore } from "../stores/data.js";

const data = useDataStore();
function addCash() {
  data.playerCash += 1000;
  data.gameOver = false;
}
</script>

<template>
  <div class="container">
    <div class="info">
      <div class="text">
        <p>You are broke!</p>
        <p>Get some credit</p>
      </div>
      <button @click="addCash">Credit</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);

  .info {
    border-radius: 9px;
    background-color: #71a170;
    width: 60%;
    height: 30%;
    text-align: center;
    font-size: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    .text {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    button {
      cursor: pointer;
      font-family: inherit;
      font-size: 2rem;
      border: none;
      background-color: #282828;
      color: #fff;
      padding: 1rem 2rem;
      border-radius: 9px;
      transition: all 0.3s ease;

      @media screen and (min-width: 800px) {
        padding: 1.5rem 3rem;
      }
      @media screen and (min-width: 800px) {
        padding: 2rem 4rem;
      }

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      &:active {
        transform: scale(0.97);
      }
    }
  }
}
</style>
