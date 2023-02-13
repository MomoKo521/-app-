import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config.js'
import Cookies from 'js-cookie'
import store from "../store/index.js"


// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)






const createRouter = () =>
    new Router({
        // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
        // base: process.env.BASE_URL,
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRouterMap
    })

const router = createRouter()
router.beforeEach((to, from, next) => {
    // 获取当前访问的路由meta元信息 根据meta.requireAuth判断当前路由是否需要token才能访问
    if (to.matched.some(r => r.meta.requireAuth)) {
        meta: { requireAuth: true }
        if (Cookies.get('Token')) {

            next();
        } else {
            console.log("登陆");
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    }
    else {
        next();
    }
})



// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router