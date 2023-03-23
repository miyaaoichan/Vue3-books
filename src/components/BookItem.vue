<template>
  <el-card class="card" @click="showDetails">
    <template #header>
      <img :src="imgUrl(book.image)" />
      <h1>{{ book.bookName }}</h1>
    </template>
    <div class="info">
      <el-tag type="success"> {{ book.author }} </el-tag>
      <el-tag>
        {{ book.type }}
      </el-tag>
      <el-tag type="warning">{{ book.rate }}</el-tag>
    </div>
  </el-card>

  <Teleport to="body">
    <TheModal
      v-if="showDetail"
      @closeModal="close"
      @nextBook="moveToNextBook()"
      @previousBook="moveToPreviousBook()"
      class="cardDetail"
      :key="bookStore.detailBook.id"
    >
      <div class="detailContent">
        <div class="name" @click="viewDetail(bookStore.detailBook)">
          <h1>
            {{ bookStore.detailBook.bookName }}
          </h1>
        </div>
        <div class="author">
          <h3>
            {{ bookStore.detailBook.author }}
          </h3>
        </div>
        <div class="decription">
          <h5>内容简介：</h5>
          <!-- <p>{{ bookStore.data.detailBook.desc }}</p> -->
          <vue-ellipsis-3 :visible-height="60" :text="bookStore.detailBook.desc" />
        </div>
        <div class="dbScore">
          <h5>豆瓣评分：</h5>
          <div class="dbInfo">
            <ScoreCircle :size="15" :rate="bookStore.detailBook.rate" />
            <div class="tags">
              <el-tag>
                {{ bookStore.detailBook.type }}
              </el-tag>
              <el-tag v-for="tag in bookStore.detailBook.tags?.split('/')">
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </div>
        <div class="myScore">
          <h5>个人推荐：</h5>
          <el-rate v-model="bookStore.detailBook.myScore" allow-half :max="10" />
          {{ bookStore.detailBook.myScore }}
        </div>
      </div>
      <img
        :src="imgUrl(bookStore.detailBook.image)"
        @click="viewDetail(bookStore.detailBook)"
      />
    </TheModal>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import ScoreCircle from "./ScoreCircle.vue";
import TheModal from "./TheModal.vue";
import { useBookStore } from "../store/bookStore";
import { moveToNext, moveToPrevious } from "../utils/bookActions";
import { VueEllipsis3 } from "vue-ellipsis-3";
import { useRouter } from "vue-router";
import { imgUrl } from "../utils";

const router = useRouter();
const props = defineProps({
  book: {
    type: Object,
    default: {},
  },
});
const bookStore = useBookStore();

const showDetail = ref(false);

function showDetails() {
  showDetail.value = true;
  bookStore.detailBook = props.book;
}
function close() {
  showDetail.value = false;
}
function moveToNextBook() {
  const msg = moveToNext(bookStore);
  if (msg) {
    window.$message.warning(msg);
  }
}
function moveToPreviousBook() {
  const msg = moveToPrevious(bookStore);
  if (msg) {
    window.$message.warning(msg);
  }
}

function viewDetail(book) {
  router.push({ name: "detail", params: { id: book.bookId } });
}
</script>

<style scoped>
.card {
  margin: 20px 0;
  width: 250px;
  height: 450px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 1);
  background-color: rgb(234, 228, 220, 0.5);
  transition: 0.5s ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 1), -5px 5px 5px rgba(0, 0, 0, 0.5);
}

.card img {
  width: 100%;
  height: 320px;
}

.card .info {
  display: flex;
  justify-content: space-between;
}

.card h1 {
  font-size: 14px;
  padding: 10px 20px;
}

.cardDetail img {
  width: 400px;
  height: 600px;
  object-fit: cover;
  cursor: pointer;
}

.cardDetail .detailContent {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
}

.dbScore .dbInfo {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
}

.dbScore .dbInfo .tags {
  display: flex;
  width: 15vw;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}

.dbScore .dbInfo .tags .el-tag {
  margin: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardDetail h1 {
  font-size: 26px;
  color: #05348b;
  cursor: pointer;
}
.cardDetail h3 {
  font-size: 22px;
  color: #185864;
}
.cardDetail h5 {
  font-size: 18px;
  color: #142a31;
}

.el-card /deep/ .el-card__header {
  padding: 0;
}
</style>

<style></style>
