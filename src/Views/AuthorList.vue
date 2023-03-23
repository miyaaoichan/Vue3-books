<template>
  <div class="tableContainer">
    <el-table :data="showAuthors" border stripe>
      <el-table-column prop="id" label="编号" :width="80"></el-table-column>
      <el-table-column prop="authorName" label="作者" :width="150">
        <template #default="scope">
          <router-link
            style="color: rgb(80, 165, 255)"
            :to="{ name: 'singleAuthor', params: { authorId: scope.row.id } }"
          >
            {{ scope.row.authorName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="nation" label="国籍" :width="100"></el-table-column>
      <el-table-column label="代表作">
        <template #default="scope">
          <el-tag
            @click="viewDetail(repBooks[scope.row.id - 1].bookId)"
            style="cursor: pointer"
            >{{ repBooks[scope.row.id - 1]?.bookName }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="个人看过的好作品数">
        <template #default="scope">
          <el-tag>{{ wellBooksCount[scope.row.id - 1] }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :size="10"
      v-model:current-page="currentPage"
      :page-size="10"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthorStore } from "../store/authorStore";
import { useBookStore } from "../store/bookStore";
import { useRouter } from "vue-router";

const authorStore = useAuthorStore();
const bookStore = useBookStore();
let authors = ref([]);
const repBooks = ref([]);
const wellBooksCount = ref([]);
const router = useRouter();
const total = computed(() => authors.value.length);
let currentPage = ref(1);

onMounted(async () => {
  await authorStore.getAllAuthors();
  if (!bookStore.bookList.length) {
    await bookStore.getAllBooks();
  }
  authors.value = authorStore.authors.slice();
  authors.value.forEach((author) => {
    let belongBooks = bookStore.bookList.filter(
      (book) => book.author === author.authorName
    );
    repBooks.value.push(
      belongBooks.sort((a, b) => {
        return b.rate - a.rate;
      })[0]
    );
    wellBooksCount.value.push(belongBooks.filter((book) => book.myScore >= 7).length);
  });
});

const showAuthors = computed(() =>
  authors.value.slice((currentPage.value - 1) * 10, currentPage.value * 10)
);

const viewDetail = (bookId) => {
  router.push({ name: "detail", params: { id: bookId } });
};
</script>

<style scoped>
.tableContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-table {
  min-width: 700px;
  margin: 10px auto;
}
</style>
