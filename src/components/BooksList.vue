<template>
  <div class="bookLi">
    <span>{{ index + 1 }}</span>
    <el-image :src="imgUrl(book.image)" loading="lazy" fit="fill"></el-image>
    <router-link
      :to="{ name: 'detail', params: { id: book.bookId } }"
      style="flex: 2 1 0; color: rgb(212, 72, 72)"
    >
      {{ book.bookName }}
    </router-link>
    <span style="flex: 2 1 0">{{ book.author }}</span>
    <span
      ><el-tag type="success">{{ book.rate }}</el-tag></span
    >
    <span
      ><el-tag type="warning">{{ book.type }}</el-tag></span
    >
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { imgUrl } from "../utils";

const props = defineProps({
  book: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
  },
});
</script>

<style scoped>
.bookLi {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(220, 223, 230);
}

.bookLi span:first-child {
  width: 50px;
}

.bookLi span:not(:first-child) {
  flex: 1 1 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.bookLi .el-image {
  height: 50px;
  width: 30px;
  /* flex:1 1 auto; */
  margin-right: 50px;
}
</style>
