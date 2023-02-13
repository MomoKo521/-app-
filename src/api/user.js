import request from '@/utils/request'
// 用户资金统计
export const balance = () => {
        return request({
            url: '/user/balance',
            method: 'get',

        })
    }
    // 获取钱包充值方案
export const rechargeTypeList = () => {
        return request({
            url: '/recharge/index',
            method: 'get',

        })

    }
    // 钱包充值
export const moneycz = (id) => {
    return request({
        url: '/recharge/test',
        method: 'post',
        data: {
            rechar_id: id
        }

    })
}



export default {
    balance,
    rechargeTypeList,
    moneycz
}