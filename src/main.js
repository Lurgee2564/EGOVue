import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import '@/assets/css/globle.css'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons'


const app= createApp(App);
for (const iconName in ElIcons) {
    if (Reflect.has(ElIcons, iconName)) {
        const item = ElIcons[iconName]
        app.component(iconName, item)
    }
}
app.use(ElementPlus).use(store).use(router).mount('#app')
