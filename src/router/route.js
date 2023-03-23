import { createRouter, createWebHistory} from "vue-router"
import Admin from "../Views/Admin.vue"
import BookDetail from "../Views/BookDetail.vue"
import EditBook from "../Views/EditBook.vue"
import AuthorList from "../Views/AuthorList.vue"
import Index from "../Views/Index.vue"


const routes = [
    {
        path: '/index',
        name: 'index',
        component: Index,
        alias: [''],
        meta: {
            title: "首页"
        }
    },
    {
        path: '/books/all',
        name: "all",
        component: () => import("../Views/ShowBooks.vue")
    },
    {
        path: "/admin/insert",
        name: "insert",
        component: () => import("../Views/InsertBook.vue")
    },
    {
        path: "/books/history",
        name: "history",
        component: () => import("../Views/ShowBooks.vue"),
    },
    {
        path: "/books/detective",
        name: "detective",
        component: () => import("../Views/ShowBooks.vue"),
    },
    {
        path: "/books/other",
        name: "other",
        component: () => import("../Views/ShowBooks.vue"),
    },
    {
        path: "/admin",
        name: 'admin',
        component: Admin
    },
    {
        path: '/book/:id',
        name: 'detail',
        component: BookDetail,
    },
    {
        path: '/admin/edit',
        name: 'edit',
        component: EditBook
    },
    {
        path: '/author',
        name: 'author',
        component: AuthorList
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../Views/Login.vue")
    },
    {
        path: '/register',
        name: 'register',
        component: () => import("../Views/Register.vue")
    },
    {
        path: '/bookData',
        name: 'bookdata',
        component: () => import("../Views/BooksData.vue")
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("../Views/NotFound.vue"),  // 引入 组件
    },
    {
        path: "/author/:authorId",
        name: 'singleAuthor',
        component: () => import("../Views/AuthorPage.vue")
    },
    {
        path: "/admin/insertAuthor",
        name: 'insertAuthor',
        component: () => import("../Views/InsertAuthor.vue")
    },
    {
        path: "/admin/Authors",
        name: "Authors",
        component: () => import("../Views/AdminAuthor.vue")
    },
    {
        path: "/admin/editAuthor",
        name: "editAuthor",
        component: () => import("../Views/EditAuthor.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0, behavior: "smooth" }
    }
})



export default router