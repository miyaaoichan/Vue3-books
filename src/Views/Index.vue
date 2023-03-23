<template>
  <div class="load" v-if="!shown">
    <el-skeleton />
    <br />
    <el-skeleton style="--el-skeleton-circle-size: 100px">
      <template #template>
        <el-skeleton-item variant="circle" />
      </template>
    </el-skeleton>
  </div>

  <div class="carousel" v-else>
    <el-card>
      <el-carousel
        :interval="4000"
        type="card"
        height="600px"
        trigger="click"
        :initial-index="1"
      >
        <el-carousel-item v-for="book in showBooks" :key="book.id">
          <img :src="imgUrl(book.image)" justify="center" @click="toBook(book.bookId)" />
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>
import { useBookStore } from "../store/bookStore";
import { ref, computed, onMounted } from "vue";
import { shuffleArray } from "../utils/arrayAction";
import { useRouter } from "vue-router";
import { imgUrl } from "../utils";

const bookStore = useBookStore();
const showBooks = ref([]);
const shown = computed(() => !!showBooks.value);
const router = useRouter();

onMounted(async () => {
  if (bookStore.bookList.length === 0) {
    await bookStore.getAllBooks();
  }
  showBooks.value = shuffleArray(bookStore.bookList).slice(0, 5);
});

function toBook(bookId) {
  router.push({ name: "detail", params: { id: bookId } });
}
</script>

<style scoped>
.carousel {
  min-width: 600px;
  margin: 20px auto;
}
.el-carousel-item {
  height: 100%;
}
.carousel img {
  height: 100%;
  object-fit: cover;
}
</style>
