// 导入axios实列
import request from '@/utils/request'
//获取购物车列表
export const getcartList = () => {
        return request({
            url: '/cart/list',
            method: 'get'
        })
    }
    // 修改购物车产品数量
export const setCartNum = (data) => {
        return request({
            url: `/cart/num`,
            method: 'post',
            data
        })
    }
    // 删除购物车产品
export const delCart = (data) => {
        return request({
            url: '/cart/del',
            method: 'post',
            data
        })
    }
    // 加入购物车
export const addCart = (data) => {
    return request({
        url: '/cart/add',
        method: 'post',
        data
    })
}



export default {
    getcartList,
    setCartNum,
    delCart,
    addCart,
}