<script setup>
import { computed } from "vue";
const props = defineProps({
  bacCol: String,
  borderColor: String,
  value: Number,
});

const bacCol = computed(() => {
  return props.bacCol;
});

const borderColor = computed(() => {
  return props.borderColor;
});
const value = computed(() => {
  return "$" + props.value;
});
</script>

<template>
  <div class="token">
    <span>
      {{ value }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.token {
  user-select: none;
  cursor: pointer;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  border: solid 7px;
  border-color: v-bind(borderColor);
  background-color: v-bind(bacCol);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 6px 12px 6px rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 800px) {
    width: 8rem;
    height: 8rem;
  }

  span {
    font-size: 1.4rem;
    color: #fff;
    font-weight: 500;

    @media screen and (min-width: 800px) {
      font-size: 2rem;
    }
  }
}
</style>
