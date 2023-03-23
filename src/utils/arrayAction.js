export function shuffleArray(target) {
    let arr = [...target]
    let m = arr.length - 1
    while (m) {
        let i = Math.floor(Math.random() * (m+1));
        [arr[m], arr[i]] = [arr[i], arr[m]]
        m--
    }
    return arr
}

// start at a, end at b
export function linspace(a,b){
    return Array.from({length: b-a+1}, (v, k) => k+a)
}