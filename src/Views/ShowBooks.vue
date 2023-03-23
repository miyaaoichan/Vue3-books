<template>
  <div class="unload" v-if="unload">
    <el-skeleton />
    <br />
    <el-skeleton style="--el-skeleton-circle-size: 100px">
      <template #template>
        <el-skeleton-item variant="circle" />
      </template>
    </el-skeleton>
  </div>
  <div v-else>
    <div class="switch">
      <button
        @click="
          bookStore.bookShowMode = 'card';
          bookStore.currentPage = 1;
        "
        :class="{ active: bookStore.bookShowMode === 'card' }"
      >
        卡片式
      </button>
      <span>|</span>
      <button
        @click="
          bookStore.bookShowMode = 'list';
          bookStore.currentPage = 1;
        "
        :class="{ active: bookStore.bookShowMode === 'list' }"
      >
        列表式
      </button>
    </div>
    <div class="content" v-if="bookStore.bookShowMode === 'card'">
      <BookItem v-for="book in showBooks" :book="book" :key="book.id"></BookItem>
    </div>
    <div v-else class="listContent">
      <el-button @click="sortShuffle">随机排序</el-button>
      <el-button>按作者排序</el-button>
      <el-button @click="sortByRate">按评分排序</el-button>
      <ul>
        <li v-for="(book, index) in showBooks" :key="index">
          <BooksList
            :book="book"
            :index="index + (bookStore.currentPage - 1) * itemsAPage"
          ></BooksList>
        </li>
      </ul>
    </div>
    <ThePagination
      :pageList="pageList"
      :length="currentList.length"
      @changePage="changePages"
      :itemsAPage="itemsAPage"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import BookItem from "../components/BookItem.vue";
import { useBookStore } from "../store/bookStore";
import { useRoute, useRouter } from "vue-router";
import BooksList from "../components/BooksList.vue";
import ThePagination from "../components/ThePagination.vue";
import { changePage } from "../router/routerAction";
import { shuffleArray, linspace } from "../utils/arrayAction";

const props = defineProps({
  pathName: String,
});
const currentList = ref([]);
const unload = ref(false);
const route = useRoute();
const router = useRouter();
const bookStore = useBookStore();

watch(
  () => route.name,
  (newVal) => {
    if (newVal === "all") {
      currentList.value = bookStore.bookList;
    } else if (newVal === "detective") {
      currentList.value = bookStore.bookList.filter((book) => book.type === "推理");
    } else if (newVal === "history") {
      currentList.value = bookStore.bookList.filter((book) => book.type === "历史");
    } else {
      currentList.value = bookStore.bookList.filter(
        (book) => book.type !== "推理" && book.type !== "历史"
      );
    }
    bookStore.currentPage = 1;
    unload.value = false;
  },
  { immediate: true }
);

let itemsAPage = computed(() => (bookStore.bookShowMode === "card" ? 6 : 10));
let showBooks = computed(() =>
  currentList.value.slice(
    itemsAPage.value * (bookStore.currentPage - 1),
    itemsAPage.value * bookStore.currentPage
  )
);

const pageList = computed(() => {
  const maxPage = Math.ceil(currentList.value.length / itemsAPage.value);
  if (maxPage <= 5) {
    return linspace(1, maxPage);
  } else {
    if (bookStore.currentPage <= 3) {
      return linspace(1, 5);
    } else if (bookStore.currentPage >= maxPage - 2) {
      return linspace(maxPage - 4, maxPage);
    } else {
      return linspace(bookStore.currentPage - 2, bookStore.currentPage + 2);
    }
  }
});

function changePages(p) {
  changePage(bookStore, route, router, p);
}

function sortShuffle() {
  currentList.value = shuffleArray(currentList.value);
}
function sortByRate() {
  currentList.value = currentList.value.sort((a, b) => b.rate - a.rate);
}
</script>

<style scoped>
.switch {
  padding: 20px 50px;
}

.switch button {
  border: none;
  background: none;
  outline: none;
  color: rgb(96, 98, 102);
  font-size: 14px;
  padding: 5px;
  cursor: pointer;
}

.switch button:hover {
  color: rgb(64, 158, 255);
}

.switch button.active {
  font-weight: bold;
  color: rgb(64, 158, 255);
}

.content {
  /* height: 1000px; */
  padding: 0px 50px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  z-index: 1;
}

.listContent {
  border-block-start: 1px solid rgba(220, 223, 230);
  border-block-end: 1px solid rgba(220, 223, 230);
  width: 100%;
  min-width: 600px;
  margin: 0 auto;
  padding: 20px 50px;
}

.listContent ul li:nth-child(2n) {
  background-color: rgba(220, 223, 230, 0.5);
}
</style>
