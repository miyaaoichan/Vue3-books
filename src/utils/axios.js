import axios from "axios"

axios.defaults.baseURL = process.env.NODE_ENV === 'development'?"/api":"http://121.41.100.66:3000/test/"

axios.interceptors.request.use(config => {
    if (config.url.includes('insert') || config.url.includes('update')) {
        config.headers.Authorization = localStorage.getItem("token")
    }

    return config
})

export function getBooks() {
    return axios({
        method: 'get',
        url: 'select',
        timeout: 1000,
    })
}

export function insertBook(Book, imgFile) {
    return Promise.all(
        [
            axios({
                method: 'post',
                url: '/insert',
                data: Book
            }),
            axios({
                method: 'post',
                url: '/insert',
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: imgFile
            }),
        ]
    )
}

export function setId(bookId, id) {
    return axios({
        method: 'post',
        url: '/setId',
        data: {
            bookId,
            id
        }
    })
}

export function getSingleBook(bookId) {
    return axios({
        method: 'get',
        url: '/selectOne',
        params: {
            bookId
        }
    })
}

export function getAuthor() {
    return axios({
        method: 'get',
        url: '/author'
    })
}

export function updateBook(book, imgFile) {
    if (imgFile) {
        return Promise.all(
            [
                axios({
                    method: 'post',
                    url: '/update',
                    data: book
                }),
                axios({
                    method: 'post',
                    url: '/update',
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    data: imgFile
                }),
            ]
        )
    } else {
        return axios({
            method: "post",
            url: '/update',
            data: book
        })
    }

}

export function register(user) {
    return axios({
        method: 'post',
        url: '/register',
        data: user
    })
}

export function login(user) {
    return axios({
        method: 'post',
        url: '/login',
        data: user
    })
}

export function getOneAuthor(id) {
    return axios({
        method: 'get',
        url: '/singleAuthor',
        params: {
            id
        }
    })
}

export function insertAuthor(author) {
    return axios({
        method: 'post',
        url: '/insertAuthor',
        data: author
    })
}

export function updateAuthor(author, imgFile) {
    if (imgFile) {
        return Promise.all(
            [
                axios({
                    method: 'post',
                    url: '/updateAuthor',
                    data: author
                }),
                axios({
                    method: 'post',
                    url: '/updateAuthor',
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    data: imgFile
                }),
            ]
        )
    } else {
        return axios({
            method: 'post',
            url: '/updateAuthor',
            data: author
        })
    }
}

