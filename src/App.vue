<script setup>
import { useRouter } from "vue-router";
import { useBookStore } from "./store/bookStore";
import TheLayout from "./components/TheLayout.vue";
import { ElMessage } from "element-plus";
import { computed } from "vue";

const router = useRouter();
const bookStore = useBookStore();
const upload = computed(() => (bookStore.bookList.length ? false : true));
(async function () {
  await bookStore.getAllBooks();
})();
router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    if (localStorage.getItem("token")) {
      next({ path: "/admin" });
    } else {
      next();
    }
  } else if (to.name === "detail") {
    bookStore.setDetail(to.params.id);
    next();
  } else if (to.name === "admin") {
    if (!localStorage.getItem("token")) {
      ElMessage.warning("请先登录");
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
</script>

<template>
  <el-skeleton :rows="5" v-if="upload" />

  <TheLayout v-else></TheLayout>
</template>

<style scoped></style>
