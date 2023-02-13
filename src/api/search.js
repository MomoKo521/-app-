// 导入axios实列
import request from '@/utils/request'

// 获取热门关键字
export const getHot = () => {
        return request({
            url: '/search/keyword',
            method: 'get',
        })
    }
    // 搜索商品
export const getsearchList = (keyword) => {
    return request({
        url: '/products',
        method: 'get',
        params: {
            keyword
        }

    })
}

export default {
    getHot,
    getsearchList
}