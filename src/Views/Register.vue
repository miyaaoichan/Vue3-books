<template>
  <el-card>
    <template #header>
      <h1>注册</h1>
    </template>
    <el-form :model="form" label-position="top" size="large">
      <el-form-item label="用户名">
        <el-input v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" clearable type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="Register">注册</el-button>
      <router-link :to="{ name: 'login' }">已注册？登录吧！</router-link>
    </el-form>
  </el-card>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { register } from "../utils/axios";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const router = useRouter();
const form = ref({
  username: "",
  password: "",
});

const Register = async () => {
  let user = Object.assign({}, form.value);
  let res = await register(user);
  if (res.status === 200) {
    ElMessage.success("注册成功！");
    router.push({ name: "login" });
  }
};
</script>

<style scoped></style>
