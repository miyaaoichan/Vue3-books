<template>
  <div class="unload" v-if="unload">
    <el-skeleton />
    <br />
    <el-skeleton style="--el-skeleton-circle-size: 100px">
      <template #template>
        <el-skeleton-item variant="circle" />
      </template>
    </el-skeleton>
  </div>
  <el-card v-else>
    <template #header>
      <div @click="goBack" class="backIcon">
        <Icon size="30">
          <ArrowBackCircleSharp />
        </Icon>
      </div>
      <h1 style="font-size: 26px; color: rgb(212 72 72)">{{ book.bookName }}</h1>
    </template>

    <div class="bookContainer">
      <div class="image">
        <img :src="imgUrl(book.image)" />
      </div>
      <div class="info">
        <span class="type">
          {{ book.type }}
        </span>
        <div class="author wrapper">
          <div class="head">
            <Icon size="30">
              <UserEdit />
            </Icon>
            <span> 作者：</span>
          </div>
          <div class="content">
            <Avatar :name="book.author" :size="150"></Avatar>
          </div>
        </div>
        <div class="score wrapper">
          <div class="head">
            <Icon size="30">
              <Star />
            </Icon>
            <span> 评分：</span>
          </div>
          <div class="content">
            <ScoreCircle :rate="book.rate" :size="20" />
          </div>
        </div>
        <div class="desc wrapper">
          <div class="head">
            <Icon size="30">
              <Book></Book>
            </Icon>
            <span>简介：</span>
          </div>
          <div class="content">
            {{ book.desc }}
          </div>
        </div>
        <div class="myScore wrapper">
          <div class="head">
            <Icon size="30">
              <GrinStars />
            </Icon>
            <span>个人评分：</span>
          </div>
          <div class="content">
            <el-rate v-model="book.myScore" allow-half :max="10" disabled show-score />
          </div>
        </div>
        <div class="tags wrapper">
          <div class="head">
            <Icon size="30">
              <Tags />
            </Icon>
            <span>标签：</span>
          </div>
          <div class="content">
            <el-tag
              v-for="tag in book.tags.split('/')"
              type="warning"
              size="large"
              style="margin: 10px"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
        <div class="girdle wrapper">
          <div class="head">
            <Icon size="30">
              <Award />
            </Icon>
            <span>腰封：</span>
          </div>
          <div class="content">
            <p
              v-for="g in book.girdle?.split('/')"
              style="margin: 10px; color: rgb(1, 132, 127)"
            >
              {{ g }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElTag } from "element-plus";
import ScoreCircle from "../components/ScoreCircle.vue";
import { Icon } from "@vicons/utils";
import { ArrowBackCircleSharp, Star, Book } from "@vicons/ionicons5";
import { UserEdit, GrinStars, Tags, Award } from "@vicons/fa";
import { getSingleBook } from "../utils/axios";
import { imgUrl } from "../utils";
import Avatar from "../components/Avatar.vue";
import { useBookStore } from "../store/bookStore";

const route = useRoute();
const router = useRouter();
const book = ref(null);
const unload = ref(true);
const bookStore = useBookStore();
async function loadData() {
  unload.value = true;
  const data = await getSingleBook(route.params.id).then((res) => res.data);
  book.value = data[0];
  unload.value = false;
  bookStore.setDetail(route.params.id);
  document.title = book.value.bookName;
}
watch(
  () => route.params.id,
  () => {
    loadData();
  },
  {
    immediate: true,
  }
);
const goBack = () => {
  router.back();
};
</script>

<style scoped>
.el-card {
  margin: 10px auto;
  background-color: rgba(249, 251, 254);
  min-width: 700px;
}

.bookContainer {
  background-color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  width: 90%;
  margin: 0 auto;
  padding: 50px;
  box-shadow: 0px 10px 10px rgb(18, 18, 46);
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60%;
}

.info .type {
  color: #0f0f2b;
  background-color: rgb(246, 246, 250);
  padding: 10px;
  width: 100px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}

.wrapper {
  margin: 30px 0;
}

.wrapper .head {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  color: rgb(18, 18, 46);
  font-size: 20px;
}

.wrapper .head span:nth-child(2) {
  margin-left: 10px;
}

.desc .content {
  line-height: 30px;
}

.image {
  width: 30%;
}

.image img {
  width: 100%;
  position: sticky;
  top: 30px;
}

.content {
  color: #6c6c7a;
}

.el-card:deep(.el-card__header) {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.el-card:deep(.el-card__header) .backIcon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
