export function changePage(bookStore, route, router, page){
    bookStore.currentPage = page;
    router.push(`/books/${route.name}`)
}