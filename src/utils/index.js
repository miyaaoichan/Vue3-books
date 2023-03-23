import { shuffleArray } from "./arrayAction"
import { useBookStore } from "../store/bookStore"


export function createBookId() {
    const codeArray = []
    let start = 'A'.charCodeAt()
    for (let i = start; i < start + 26; i++) {
        codeArray.push(String.fromCharCode(i))
    }
    start = 'a'.charCodeAt()
    for (let i = start; i < start + 26; i++) {
        codeArray.push(String.fromCharCode(i))
    }
    for (let i = 0; i < 10; i++) {
        codeArray.push(i)
    }
    // console.log(codeArray);
    return shuffleArray(codeArray).slice(0, 8).join("")
}

export function checkAuthor(name) {
    const bookStore = useBookStore()
    return bookStore.books?.map(v => v.author).includes(name)
}

export function imgUrl(url) {
    return new URL(`../assets/images/${url}`, import.meta.url).href
}

export function setTitle(name) {
    if (name === 'index') {
        document.title = '首页'
    } else if (name === 'all') {
        document.title = '全部书'
    } else if (name === 'insert') {
        document.title = '添加书籍'
    } else if (name === 'history') {
        document.title = '历史书'
    } else if (name === 'detective') {
        document.title = '侦探小说'
    } else if (name === 'other') {
        document.title = '其他的书'
    } else if (name === 'admin') {
        document.title = '后台'
    } else if (name === 'edit') {
        document.title = '编辑书'
    } else if (name === 'author') {
        document.title = '作者页'
    } else if (name === 'login') {
        document.title = '登录'
    } else if (name === 'register') {
        document.title = '注册'
    } else if (name === 'bookdata') {
        document.title = '数据展示'
    } else if (name === 'notFound') {
        document.title = '404'
    } else if (name === 'insertAuthor') {
        document.title = '新增作者'
    } else if (name === 'Authors') {
        document.title = '所有作者'
    } else if (name === 'editAuthor') {
        document.title = '编辑作者'
    }
}

export function debounce(fn, delay) {
    let timer
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}

export function throttle(fn, delay) {
    let start = Date.now()
    let timer = null

    return function () {
        clearTimeout(timer)
        let now = Date.now()
        let remaining = delay - (now - start)
        if (remaining < 0) {
            fn()
            start = Date.now()
        } else {
            setTimeout(fn, remaining)
        }
    }
}