<template>
  <el-card>
    <template #header>
      <div @click="goBack" style="cursor: pointer; margin-right: 20px">
        <Icon size="30">
          <ArrowBackCircleSharp />
        </Icon>
      </div>
      <h2>修改图书信息</h2>
    </template>

    <el-form :model="model" label-position="top" ref="formRef" size="large">
      <el-form-item label="书名" prop="bookName">
        <el-input v-model="model.bookName" clearable></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="model.author" clearable></el-input>
      </el-form-item>
      <el-form-item label="豆瓣评分" prop="rate">
        <el-input v-model="model.rate" clearable></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="model.type">
          <el-option
            v-for="type in types"
            :key="type.value"
            :value="type.value"
            :label="type.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="model.desc" type="textarea" :rows="6" clearable></el-input>
      </el-form-item>
      <el-form-item label="个人评价" prop="myScore">
        <el-input v-model="model.myScore" clearable></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="model.tags" clearable></el-input>
      </el-form-item>
      <el-form-item label="腰封">
        <el-input v-model="model.girdle" clearable type="textarea" :rows="6"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <img
          v-if="model.image"
          :src="imgUrl(model.image)"
          :width="144"
          :height="144"
          style="object-fit: cover"
        />
        <el-upload
          :limit="1"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="onChange"
          :on-remove="onRemove"
        >
          点击上传图片
        </el-upload>
      </el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form>
  </el-card>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getBooks } from "../utils/axios";
import { updateBook } from "../utils/axios";
import { ArrowBackCircleSharp } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";
import { imgUrl } from "../utils";

const route = useRoute();
const router = useRouter();
let img = ref(null);
const types = [
  {
    value: "推理",
    label: "推理",
  },
  {
    value: "历史",
    label: "历史",
  },
  {
    value: "其他",
    label: "其他",
  },
];
const model = reactive({
  bookName: "",
  author: "",
  rate: "",
  type: "",
  desc: "",
  myScore: "",
  tags: "",
  girdle: "",
  image: "",
});

onMounted(async () => {
  const books = await getBooks().then((res) => res.data);
  const book = books.find((v) => v.bookId === route.query.id);
  let { bookName, author, rate, type, desc, myScore, tags, girdle, image } = book;
  model.bookName = bookName;
  model.author = author;
  model.rate = rate;
  model.type = type;
  model.desc = desc;
  model.myScore = myScore;
  model.tags = tags;
  model.girdle = girdle;
  model.image = image;
});

const submit = () => {
  const book = { ...model };
  book.bookId = route.query.id;
  let form = undefined;
  if (img.value !== null) {
    let newImg = new File(
      [img.value],
      route.query.id + "." + img.value.name.split(".")[1],
      { type: img.value.type }
    );
    form = new FormData();
    form.append("img", newImg);
  }

  updateBook(book, form).then(() => {
    ElMessage.success("修改成功");
    router.back();
  });
};

const goBack = () => {
  router.back();
};

const onChange = (file) => {
  img.value = file.raw;
};

const onRemove = () => {
  img.value = null;
};
</script>

<style scoped>
.el-card {
  width: 95%;
  margin: 10px auto;
}

.el-card /deep/ .el-card__header {
  display: flex;
  align-items: center;
}
</style>
