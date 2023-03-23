<template>
  <div class="avatarContainer">
    <img :src="image" v-if="showAvatar" />
    <div v-else>
      {{ name }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  src: {
    type: String,
  },
  name: {
    type: String,
  },
  size: {
    type: Number,
    default: 100,
  },
});

const size = computed(() => props.size + "px");
const showAvatar = computed(() => !(props.src == null));
const image = computed(() => `/assets/${props.src}`);
</script>

<style scoped>
.avatarContainer {
  width: v-bind(size);
  height: v-bind(size);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.avatarContainer img,
.avatarContainer div {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #9da3b9;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
}

.avatarContainer::after {
  content: "";
  height: 110%;
  width: 110%;
  background-color: rgb(230, 239, 250);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 0;
  transform: translate(-50%, -50%);
}
</style>
