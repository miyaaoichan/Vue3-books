import { defineStore } from "pinia";
import { ref } from "vue";
import { getBooks } from "../utils/axios";

export const useBookStore = defineStore('bookStore', () => {
    const bookList = ref([])
    const detailBook = ref({})
    let detailBookId = ref(undefined)
    const currentPage = ref(1)
    const bookShowMode = ref('card')

    async function getAllBooks() {
        const books = await getBooks().then(res => res.data)
        bookList.value = books
    }

    function setDetail(id) {
        detailBookId.value = id
    }

    return {
        detailBook,
        bookList,
        detailBookId,
        currentPage,
        bookShowMode,
        getAllBooks,
        setDetail
    }
})