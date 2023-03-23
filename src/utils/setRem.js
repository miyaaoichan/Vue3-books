import { throttle } from "./index";

export const setDomFontSize = () => {
    let width = document.documentElement.clientWidth
    let fontSize = (width <= 1200 ? 1200 : width) / 100 + 'px';
    (document.getElementsByTagName('html')[0].style)['font-size'] = fontSize;
}
let setDomFontSizeDebounce = throttle(setDomFontSize, 100)
window.addEventListener("resize", () => {
    setDomFontSizeDebounce()
})