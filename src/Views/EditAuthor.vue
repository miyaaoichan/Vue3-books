<template>
  <el-card>
    <template #header>
      <div @click="goBack" style="cursor: pointer; margin-right: 20px">
        <Icon size="30">
          <ArrowBackCircleSharp />
        </Icon>
      </div>
      <h2>修改作者信息</h2>
    </template>

    <el-form :model="model" label-position="top" ref="formRef" size="large">
      <el-form-item label="作者名" prop="authorName">
        <el-input v-model="model.authorName" clearable></el-input>
      </el-form-item>
      <el-form-item label="国籍" prop="nation">
        <el-input v-model="model.nation" clearable></el-input>
      </el-form-item>
      <el-form-item label="出生年份" prop="bornYear">
        <el-input v-model="model.bornYear" clearable></el-input>
      </el-form-item>
      <el-form-item label="去世年份" prop="dieYear">
        <el-input v-model="model.dieYear" clearable></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="desc">
        <el-input v-model="model.desc" type="textarea" :rows="6" clearable></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <img
          v-if="model.image"
          :src="avatar"
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
import { reactive, onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getOneAuthor } from "../utils/axios";
import { updateAuthor } from "../utils/axios";
import { ArrowBackCircleSharp } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";

const route = useRoute();
const router = useRouter();
let img = ref(null);
const model = reactive({
  authorName: "",
  nation: "",
  bornYear: "",
  dieYear: "",
  desc: "",
  image: "",
});
const avatar = computed(() => `/assets/${model.image}`);

onMounted(async () => {
  const authorData = await getOneAuthor(route.query.id).then((res) => res.data);
  let { authorName, nation, bornYear, dieYear, image, desc } = authorData[0];
  model.authorName = authorName;
  model.nation = nation;
  model.bornYear = bornYear;
  model.dieYear = dieYear;
  model.desc = desc;
  model.image = image;
});

const submit = async () => {
  const author = { ...model };
  author.id = route.query.id;
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

  updateAuthor(author, form).then(() => {
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

const compressFile = (file) => {
  return new Promise((resolve, reject) => {
    ImageCompressor(file, {
      quality: 0.6,
      success(result) {
        resolve(result);
      },
      error(e) {
        reject(e);
      },
    });
  });
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
