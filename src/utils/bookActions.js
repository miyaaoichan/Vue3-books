import { useBookStore } from "../store/bookStore"
const bookStore = useBookStore()
export function moveToNext() {
    console.log(bookStore.bookList)
    const index = bookStore.bookList.indexOf(bookStore.detailBook),
        length = bookStore.bookList.length
    if (index === length - 1) {
        return "后面木有了"
    }
    bookStore.detailBook = bookStore.bookList[index + 1]
}

export function moveToPrevious() {
    const index = bookStore.bookList.indexOf(bookStore.detailBook)
    if (index === 0) {
        return "前面木有了"
    }
    bookStore.detailBook = bookStore.bookList[index - 1]
}

export function createId() {
    const str = [];
    let id = ""
    for (let i = 65; i < 91; i++) {
        str.push(String.fromCharCode(i))
    }
    for (let i = 97; i < 123; i++) {
        str.push(String.fromCharCode(i))
    }
    for (let i = 0; i < 10; i++) {
        str.push(i)
    }
    // console.log(str);
    for (let i = 0; i < 8; i++) {
        const index = Math.floor(Math.random() * str.length)
        id += str[index]
    }
    return id
}