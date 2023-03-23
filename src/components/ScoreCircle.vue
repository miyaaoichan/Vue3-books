<template>
  <div class="score">
    <p>豆瓣：{{ rate }} 分</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  rate: Number,
  size: Number,
});
const score = (props.rate * 10) / 2 + 50;
const size = props.size + "rem";
const fakeElementSize = 2 * props.size + "rem";
let transform = ref(`translate(-25%,-${score}%) rotate(0)`);
let transform_50 = ref(`translate(-25%,-${score}%) rotate(180deg)`);
let transform_100 = ref(`translate(-25%,-${score}%) rotate(360deg)`);
</script>

<style scoped>
.score {
  display: flex;
  justify-content: center;
  align-items: center;
  height: v-bind(size);
  width: v-bind(size);
  position: relative;
  border-radius: 50%;
  background-color: rgb(118, 218, 255);
  overflow: hidden;
  font-size: 20px;
}

.score::before,
.score::after {
  content: "";
  position: absolute;
  width: v-bind(fakeElementSize);
  height: v-bind(fakeElementSize);
  top: 0;
  left: 0%;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 44%;
  transform: v-bind(transform);
  animation: rotate 6s infinite linear;
  z-index: 10;
}

.score::after {
  border-radius: 48%;
  background-color: rgba(255, 255, 255, 0.9);
  transform: v-bind(transform);
  animation: rotate 10s infinite -5s linear;
  z-index: 20;
}

@keyframes rotate {
  50% {
    transform: v-bind(transform_50);
  }

  100% {
    transform: v-bind(transform_100);
  }
}
</style>
