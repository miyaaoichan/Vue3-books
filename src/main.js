import { createApp } from 'vue'
import "../src/style.css"
import router from "./router/route"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from "pinia"
import "echarts"
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiHomeHeartFill, HiSolidDatabase, GiBookshelf, ViFileTypeJenkins, FaRegularGrinTongueSquint, MdDensitysmall, BiPenFill, FaHome } from "oh-vue-icons/icons";
import {setDomFontSize} from "./utils/setRem.js"
setDomFontSize()

addIcons(RiHomeHeartFill, HiSolidDatabase, GiBookshelf, ViFileTypeJenkins, FaRegularGrinTongueSquint, MdDensitysmall, BiPenFill, FaHome );


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.component('v-icon', OhVueIcon)
app.use(createPinia())
app.mount('#app')
