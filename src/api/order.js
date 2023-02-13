// 订单模块
// axios
import request from '@/utils/request'

// 订单确认
export const getconfirm = (data) => {
        return request({
            url: '/order/confirm',
            method: 'post',
            data
        })
    }
    // 计算订单金额
export const orderSum = (data) => {
        return request({
            url: `/order/computed/${data.key}`,
            method: 'post',
            data
        })

    }
    // 订单创建
export const createOrder = (data) => {
        return request({
            url: `/order/create/${data.key}`,
            method: 'post',
            data
        })
    }
    // 订单列表
export const orderList = (data) => {
        return request({
            url: '/order/list',
            method: 'get',
            params: data
        })
    }
    // 订单支付
export const pay = (data) => {
        return request({
            url: '/order/pay',
            method: 'post',
            data
        })
    }
    // 订单收货
export const take = (data) => {
        return request({
            url: '/order/take',
            method: 'post',
            data
        })
    }
    // 删除订单
export const del = (data) => {
        return request({
            url: '/order/del',
            method: 'post',
            data
        })
    }
    // 取消订单
export const cancelorder = (data) => {
        return request({
            url: '/order/cancel',
            method: 'post',
            data
        })
    }
    // 订单详情
export const orderInfo = (key) => {
    return request({
        url: `/order/detail/${key}`,
        method: 'get'

    })
}
export default {
    getconfirm,
    orderSum,
    createOrder,
    orderList,
    take,
    del,
    cancelorder,
    orderInfo
}