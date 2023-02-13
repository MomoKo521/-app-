import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false
    // 全局挂载api接口路径
import { baseApi } from '@/config'
Vue.prototype.$baseApi = baseApi

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')