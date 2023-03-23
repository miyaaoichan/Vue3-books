<template>
  <!-- <el-container>
    <el-aside style="border-right: 1px solid rgb(220, 223, 230); width: 250px">
      <SideNavbar v-if="navbarShow"></SideNavbar>
      <SideBookList v-else></SideBookList>
    </el-aside>
    <el-main style="padding: 0" class="main">
      <el-row>
        <el-col :span="18">
          <TheHeader></TheHeader>
          <RouterView />
        </el-col>
        <el-col :span="6">
          <div class="admin">
            <img src="../assets/images/wechat.jpg" width="200" />
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container> -->
  <div class="container">
    <aside class="left">
      <SideNavbar v-if="navbarShow"></SideNavbar>
      <SideBookList v-else></SideBookList>
    </aside>
    <main>
      <TheHeader></TheHeader>
      <RouterView />
    </main>
    <div class="wechat">
      <img src="../assets/images/wechat.jpg" width="200" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheHeader from "./TheHeader.vue";
import { ElContainer, ElMain, ElAside, ElRow, ElCol } from "element-plus";
import SideNavbar from "./SideNavbar.vue";
import { useRouter } from "vue-router";
import SideBookList from "./SideBookList.vue";

let navbarShow = ref(true);
const router = useRouter();

router.beforeEach((to, from, next) => {
  if (to.name === "detail") {
    navbarShow.value = false;
  } else {
    navbarShow.value = true;
  }
  next();
});
</script>

<style scoped>
.main {
  height: calc(100vh);
}

.admin {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 20px;
}

.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

aside.left {
  height: 100vh;
  flex: 0 0 250px;
  position: sticky;
  top: 0;
  margin-right: 20px;
}

.wechat {
  flex: 0 0 250px;
}

img {
  width: 100%;
  position: sticky;
  top: 50px;
  margin-left: 20px;
}

main {
  flex: 1 1 auto;
}
</style>
