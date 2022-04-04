<script setup>
import { computed } from "vue";
const props = defineProps({
  cardURL: Object,
});

function getCardImg(cardPath) {
  return new URL(`../assets/${cardPath}.png`, import.meta.url).href;
}

const card = computed(() => {
  return `url(${getCardImg(props.cardURL.cardPath)})`;
});
</script>
<template>
  <div class="card-container">
    <div class="card-front"></div>
    <div class="card-back"></div>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  position: relative;
  width: 8rem;
  height: 12rem;
  transform-style: preserve-3d;
  transition: all 0.5s ease;

  @media screen and (min-width: 600px) {
    width: 10rem;
    height: 15rem;
  }

  @media screen and (min-width: 800px) {
    width: 12rem;
    height: 18rem;
  }
  @media screen and (min-width: 1200px) {
    width: 14rem;
    height: 21rem;
  }

  .card-front {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background: v-bind(card);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
  }
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background: url("../assets/back.png");
    transform: rotateY(180deg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
  }
}
</style>
