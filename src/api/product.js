//商品列表
// axios
import request from '@/utils/request'

// 商品列表
export const getproductList = (data) => {
    return request({
        url: '/products',
        method: 'get',
        params: data

    })
}

//商品详情
export const getGoodsdetails = (id) => {
        return request({
            url: `/product/detail/${id}`,
            method: 'get',
        })
    }
    // 收藏商品
export const addCollection = (data) => {
        return request({
            url: '/collect/add',
            method: 'post',
            data
        })
    }
    // 取消收藏
export const cancel = (data) => {
    return request({
        url: '/collect/del',
        method: 'post',
        data
    })
}

export default {
    getproductList,
    getGoodsdetails,
    addCollection,
    cancel,
}