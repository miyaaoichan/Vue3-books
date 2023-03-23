<template>
  <el-card class="book-box" shadow="always">
    <template #header>
      <h1>添加读过的书</h1>
    </template>
    <el-form
      :model="model"
      label-position="top"
      ref="formRef"
      :rules="rules"
      size="large"
    >
      <el-form-item label="书名" prop="name">
        <el-input v-model="model.name" clearable></el-input>
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
        <el-input v-model="model.desc" type="textarea" :rows="4" clearable></el-input>
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { insertBook } from "../utils/axios";
import { ElMessage } from "element-plus";
import { createBookId } from "../utils/index";
import { useBookStore } from "../store/bookStore";

const bookStore = useBookStore();
const formRef = ref(null);
const img = ref(null);
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
  name: "",
  author: "",
  rate: "",
  type: "",
  desc: "",
  myScore: "",
  tags: "",
  girdle: "",
});
const rules = reactive({
  name: [{ required: true, message: "请输入书名", trigger: "blur" }],
  author: [{ required: true, message: "请输入作者名", trigger: "blur" }],
  rate: [{ required: true, message: "请输入豆瓣评分", trigger: "blur" }],
  type: [{ required: true, message: "请选择类型", trigger: "blur" }],
  myScore: [{ required: true, message: "请输入个人评价", trigger: "blur" }],
});
const router = useRouter();

const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const bookId = createBookId();
      const Book = {
        bookName: model.name,
        author: model.author,
        rate: model.rate,
        type: model.type,
        desc: model.desc,
        myScore: model.myScore,
        tags: model.tags,
        girdle: model.girdle,
        bookId: bookId,
      };
      let form = undefined;
      if (img.value !== null) {
        let newImg = new File([img.value], bookId + "." + img.value.name.split(".")[1], {
          type: img.value.type,
        });
        form = new FormData();
        form.append("img", newImg);
        // let bookFile = new File()
        let bookData = JSON.stringify(Book);
        form.append("book", bookData);
      }
      insertBook(Book, form)
        .then(() => {
          if (!bookStore.bookList.map((book) => book.author).includes(model.author)) {
            ElMessage.warning("检测到新作者，将跳转到新增作者页面");
            router.push({ name: "insertAuthor" });
          } else {
            router.push({ name: "admin" });
            ElMessage.success("添加成功");
          }
        })
        .catch((error) => {
          console.log(error);
          ElMessage.error(error);
          router.push({ name: "index" });
        });
    } else {
      ElMessage.error("表单填写有误");
    }
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
.book-box {
  width: 95%;
  min-width: 700px;
  margin: 10px auto;
}
</style>
