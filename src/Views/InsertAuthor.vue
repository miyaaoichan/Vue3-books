<template>
    <el-card class="book-box" shadow='always'>
        <template #header>
            <h1>添加作者</h1>
        </template>
        <el-form :model="model" label-position="top" ref="formRef" :rules="rules" size="large">
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
            <el-form-item label="介绍">
                <el-input v-model="model.desc" type="textarea" :rows="4" clearable></el-input>
            </el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-form>
    </el-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { insertAuthor } from "../utils/axios"
import { ElMessage } from "element-plus"
import { createBookId, checkAuthor } from "../utils/index"
import { useBookStore } from "../store/bookStore";

const bookStore = useBookStore()
const formRef = ref(null)

const model = reactive({
    authorName: '',
    nation: '',
    bornYear: "",
    dieYear: '',
    desc: '',
})
const rules = reactive({
    authorName: [{ required: true, message: '请输入作者名', trigger: 'blur' }],
    nation: [{ required: true, message: '请输入作者国籍', trigger: 'blur' }],
})
const router = useRouter()

const submit = () => {
    formRef.value.validate(valid => {
        if (valid) {
            const author = {
                authorName: model.authorName,
                nation: model.nation,
                bornYear: model.bornYear || '0',
                dieYear: model.dieYear || '0',
                desc: model.desc
            }
            insertAuthor(author).then(() => {
                ElMessage.success('增加成功')
                router.push({name: 'admin'})
            }).catch(err => {
                console.log(err);
            })
        }
    }
    )
}
</script>

<style scoped>
.book-box {
    width: 95%;
    min-width: 700px;
    margin: 10px auto;
}
</style>