// 收货地址模块api
// 导入axios实列
import request from '@/utils/request'


// 获取用户收货地址列表
export const getaddressList = (data) => {
        return request({
            url: '/address/list',
            method: 'get',
            params: data
        })
    }
    // 获取地址详情
export const getaddressInfo = (id) => {
        return request({
            url: `/address/detail/${id}`,
            method: 'get',

        })
    }
    // 获取省市区数据
export const getregion = () => {
        return request({
            url: '/citys',
            method: 'get'
        })
    }
    // 添加/修改联系人
export const operationaddress = (data) => {
        return request({
            url: '/address/edit',
            method: 'post',
            data
        })
    }
    // 删除地址
export const deladdress = (id) => {
    return request({
        url: '/address/del',
        method: 'post',
        data: {
            id
        }
    })

}
export default {
    getaddressList,
    getaddressInfo,
    getregion,
    operationaddress,
    deladdress
}