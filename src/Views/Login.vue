<template>
  <el-card>
    <template #header>
      <h1>登录</h1>
    </template>
    <el-form :model="form" label-position="top" size="large">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" clearable type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="Login">登录</el-button>
      <router-link :to="{ name: 'register' }">没注册？点这里！</router-link>
    </el-form>
  </el-card>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { login } from "../utils/axios";

const router = useRouter();
const form = ref({
  username: "",
  password: "",
});

const Login = async () => {
  let user = Object.assign({}, form.value);
  let res = await login(user);
  if (res.status === 200) {
    ElMessage.success("登录成功！");
    localStorage.setItem("token", res.headers.authorization);
    router.push({ name: "admin" });
  } else {
    ElMessage.warning("登陆失败");
  }
};
</script>

<style scoped></style>
