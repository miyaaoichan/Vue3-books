<template>
  <div class="list-container" ref="list" @scroll="scrollEvent($e)">
    <el-button type="primary" round plain @click="router.push('/index')">首页</el-button>
    <div class="list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="list" :style="{ transform: Transform }">
      <div
        class="item"
        v-for="book in visibleData"
        :class="{ active: book.bookId === bookStore.detailBookId }"
        :key="book.id"
        @click="toBook(book.bookId)"
      >
        <div class="image">
          <img :src="imgUrl(book.image)" width="80" height="80" />
        </div>
        {{ book.bookName }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookStore } from "../store/bookStore";
import { imgUrl } from "../utils";
import { ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const bookStore = useBookStore();
const router = useRouter();
const route = useRoute();
const data = bookStore.bookList;
const itemSize = 70;

let start = ref(0);
let startOffset = ref(start.value * itemSize);
const list = ref(null);

const listHeight = data.length * itemSize;
const visibleCount = computed(() =>
  Math.ceil(document.documentElement.offsetHeight / itemSize)
);
const Transform = computed(() => `translate(0, ${startOffset.value}px)`);
const end = computed(() => start.value + visibleCount.value);
const visibleData = computed(() =>
  data.slice(start.value, Math.min(end.value, data.length))
);

watch(
  () => route.params.id,
  (newVal) => {
    start.value = data.findIndex((book) => book.bookId === newVal);
    list.value.scrollTop = start.value * itemSize;
  }
);
const toBook = (id) => {
  router.push({ name: "detail", params: { id } });
};

const scrollEvent = (e) => {
  let scrollTop = list.value.scrollTop;
  start.value = Math.floor(scrollTop / itemSize);
  startOffset.value = scrollTop - (scrollTop % itemSize);
};
</script>

<style scoped>
.list-container {
  height: 100vh;
  padding: 20px 5px;
  background-color: rgb(244, 241, 237);
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}
.list {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
}
.el-button {
  margin-left: 5px;
}
.item {
  height: 70px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
}

.item:hover {
  transform: scale(1.05);
  color: rgba(64, 158, 255, 0.6);
}

.item.active {
  font-size: 18px;
  font-weight: 600;
  color: rgb(64, 158, 255);
}

.image {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 5px;
}

.image img {
  object-fit: cover;
}

.phantom-list {
  z-index: -1;
  left: 0;
  top: 0;
  right: 0;
}
</style>
