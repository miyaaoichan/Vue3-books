<template>
  <el-card>
    <template #header>
      <h1>所有收录作品</h1>
    </template>
    <el-button type="success" @click="toInsert" class="add">新增</el-button>
    <el-table
      :data="tableData"
      stripe
      border
      :default-sort="{ prop: 'id', order: 'ascending' }"
    >
      <el-table-column prop="id" label="编号" width="100" sortable />
      <el-table-column prop="bookName" label="书名" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="rate" label="豆瓣分" width="100" />
      <el-table-column prop="type" label="类型" width="100" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="toEdit(scope.row.bookId)">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useBookStore } from "../store/bookStore";
import { useRouter } from "vue-router";

const router = useRouter();
const bookStore = useBookStore();
const tableData = ref([]);
onMounted(async () => {
  await bookStore.getAllBooks();
  tableData.value = bookStore.bookList;
});

const toInsert = () => {
  router.push({ name: "insert" });
};
const toEdit = (bookId) => {
  router.push({ name: "edit", query: { id: bookId } });
};
</script>

<style scoped>
.el-card {
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  /* height: calc(100vh - 100px); */
}

.add {
  margin-bottom: 20px;
}
</style>
