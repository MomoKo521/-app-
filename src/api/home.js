// home模块的api
// 导入axios实列
import request from '@/utils/request'

// 获取首页轮播图
export const getBanner = () => {
    return request({
        method: 'get',
        url: '/index/banner'
    })
}

//获取首页菜单
export const getMenus = () => {
        return request({
            url: '/index/menus',
            method: 'get'
        })
    }
    //获取首页精推荐
export const getBastList = () => {
        return request({
            url: '/index/bastList',
            method: 'get'
        })
    }
    //获取首页猜你喜欢
export const getLikeList = () => {
    return request({
        url: '/index/like',
        method: 'get'
    })
}
export default {
    getBanner,
    getMenus,
    getBastList,
    getLikeList,
}