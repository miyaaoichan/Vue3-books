<template>
    <div class="load" v-if="!shown">
        <el-skeleton />
        <br />
        <el-skeleton style="--el-skeleton-circle-size: 100px">
            <template #template>
                <el-skeleton-item variant="circle" />
            </template>
        </el-skeleton>
    </div>
    <div v-else>
        <el-card class="container">
            <div @click="goBack">
                <Icon size="30">
                    <ArrowBackCircleSharp />
                </Icon>
            </div>

            <div class="authorInfo">
                <div class="authorAvatar">
                    <Avatar :src="author.image" :name="author.authorName" :size="150"></Avatar>
                </div>
                <div class="info">
                    <h2>{{ author.authorName }}</h2>
                    <div>
                        <span>{{ author.nation }} {{ authorAge}}</span>
                    </div>
                    <p><strong>简介：</strong> <br />
                    <p style="margin: 5px 0;">{{ author.desc }}</p>
                    </p>
                    <div class="moreInfo" v-if="moreOrLess">
                        <div class="bestBook">
                            <h4>最好：</h4>  
                            <div>
                                <img :src="imgUrl(author.highestBook.image)" alt="" style="margin-right: 10px;">
                                <el-tag size="large" @click="gotoDetail(author.highestBook)">{{ author.highestBook.bookName }}</el-tag>
                            </div>
                        </div>
                        <div class="hasSeen">
                            <h4>看过：</h4> 
                            <div v-for="book in author.allRead">
                                <el-tag size="large" type="success" @click="gotoDetail(book)">{{book.bookName}}</el-tag>
                            </div>
                        </div>
                    </div>
                    <button @click="moreOrLess = !moreOrLess">{{ btnText }}</button>
                    
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { getOneAuthor } from "../utils/axios"
import { useRoute, useRouter } from "vue-router"
import Avatar from "../components/Avatar.vue";
import { Icon } from "@vicons/utils"
import { ArrowBackCircleSharp } from "@vicons/ionicons5"
import { useBookStore } from "../store/bookStore";
import { imgUrl } from "../utils";


const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()
let author = ref({})
let moreOrLess = ref(false)
let shown = computed(() => author.value.length !== 0)
const authorAge = computed(() => {
    if (author.value.dieYear === null && author.value.bornYear === null) {
        return
    } else if (author.value.dieYear === null) {
        return new Date().getFullYear() - (+author.value.bornYear) + '岁'
    } else {
        return +author.value.dieYear - (+author.value.bornYear) +  "岁*"
    }
})
const btnText = computed(() => moreOrLess.value ? "折叠" : "查看更多")
onMounted(async () => {
    let res = await getOneAuthor(route.params.authorId).then(res => res.data)
    author.value = res[0]
    author.value.allRead = bookStore.bookList.filter(book => book.author === author.value.authorName)
    author.value.highestBook = author.value.allRead.sort((a, b) => b.rate - a.rate)[0]
    document.title = author.value.authorName
})


const goBack = () => {
    router.back()
}
const gotoDetail = book => {
    router.push({name: "detail", params:{id: book.bookId}})
}
</script>

<style scoped>
.container {
    width: 800px;
    min-width: 400px;
    margin: 50px auto;
    background-color: rgba(243, 248, 254, 0.5);
}

.authorInfo {
    width: 70%;
    margin: 0 auto;
    background-color: #fff;
    padding: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    color: #33436C;
    border-radius: 20px;
    box-shadow: 0 10px 10px rgb(230, 239, 250);
}

.authorAvatar {
    margin-right: 30px;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
}

.info h2 {
    margin: 10px 0;
}

.info div:nth-of-type(1) {
    display: flex;
    margin-bottom: 10px;
}

.info button {
    outline: none;
    border-radius: 5px;
    padding: 10px 20px;
    color: #33436C;
    background: none;
    border: 1px solid #9DA3B9;
    margin: 10px 0;
    cursor: pointer;
}

.bestBook,
.hasSeen{
    display: flex;
    flex-direction: column;
    margin: 20px 0;
}
.bestBook div,
.hasSeen div{
    padding: 10px 0;
    display: flex;
    align-items: center;
    height: 100px;
}
.bestBook div img{
    height: 100%;
    object-fit: cover;
}
.el-tag{
    cursor: pointer;
}
</style>