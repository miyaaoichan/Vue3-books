<template>
  <el-card>
    <template #header>
      <h1>所有作者</h1>
    </template>
    <el-button type="success" @click="toInsert" class="add">新增</el-button>
    <el-table
      :data="tableData"
      stripe
      border
      :default-sort="{ prop: 'id', order: 'ascending' }"
    >
      <el-table-column prop="id" label="编号" width="100" sortable />
      <el-table-column prop="authorName" label="作者名" />
      <el-table-column prop="nation" label="国籍" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="toEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthorStore } from "../store/authorStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authorStore = useAuthorStore();
const tableData = ref([]);
onMounted(async () => {
  await authorStore.getAllAuthors();
  tableData.value = authorStore.authors;
});

const toInsert = () => {
  router.push({ name: "insertAuthor" });
};

const toEdit = (id) => {
  router.push({ name: "editAuthor", query: { id: id } });
};
</script>

<style scoped>
.el-card {
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  /* height: calc(100vh - 100px); */
}

.add {
  margin-bottom: 20px;
}
</style>
