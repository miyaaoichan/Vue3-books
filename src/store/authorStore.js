import { defineStore } from "pinia";
import { ref } from "vue";
import { getAuthor } from "../utils/axios";

export const useAuthorStore = defineStore('authorStore', () => {
    const authors = ref([])

    async function getAllAuthors(){
        authors.value = await getAuthor().then(res => res.data)
    }

    return {
        authors,
        getAllAuthors
    }
})