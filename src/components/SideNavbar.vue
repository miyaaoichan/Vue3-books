<template>
  <el-menu
    class="menu"
    :default-openeds="state.openeds"
    :router="true"
    :default-active="activeIndex"
  >
    <img
      src="../assets/images/Sprigatito.png"
      alt="新叶喵"
      width="100"
      height="100"
      style="padding: 10px 0 0 10px"
    />
    <div class="client" v-if="mode === 'client'">
      <el-sub-menu index="1">
        <template #title>
          <h1>opening</h1>
        </template>
        <el-menu-item index="/"><v-icon name="ri-home-heart-fill" />首页</el-menu-item>
        <el-menu-item index="/bookData"
          ><v-icon name="hi-solid-database" />数据展示</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <h1>书本展示</h1>
        </template>
        <el-menu-item index="/books/all"
          ><v-icon name="gi-bookshelf" />全部书籍的展示</el-menu-item
        >
        <el-menu-item index="/books/detective"
          ><v-icon
            name="fa-regular-grin-tongue-squint"
          />没什么品味的推理小说</el-menu-item
        >
        <el-menu-item index="/books/history"
          ><v-icon name="vi-file-type-jenkins" />看不懂的历史书</el-menu-item
        >
        <el-menu-item index="/books/other"
          ><v-icon name="md-densitysmall" />其他杂七杂八的书</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <h1>作者展示</h1>
        </template>
        <el-menu-item index="/author"
          ><v-icon name="bi-pen-fill" />都有哪些作者呢？</el-menu-item
        >
      </el-sub-menu>
    </div>
    <div class="server" v-else>
      <el-sub-menu index="1">
        <template #title>
          <h1>后台</h1>
        </template>
        <el-menu-item index="/admin">所有书</el-menu-item>
        <el-menu-item index="/admin/Authors">所有作者</el-menu-item>
      </el-sub-menu>
    </div>
  </el-menu>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";

const activeIndex = computed(() => route.path);
const mode = computed(() => (route.path.includes("admin") ? "server" : "client"));
const route = useRoute();

const state = reactive({
  openeds: ["1", "2", "3"],
});
</script>

<style scoped>
.menu {
  background-color: rgba(234, 228, 220, 0.5);
  height: 100vh;
}

.el-menu-item {
  background-color: rgba(234, 228, 220, 0.5);
  transition: 0.2s ease;
}

.el-menu-item:hover,
.el-menu-item.is-active {
  transform: scaleY(1.05);
  font-size: 16px;
  color: rgb(64, 158, 255);
}
</style>
