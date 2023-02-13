// 导入axios实列
import request from '@/utils/request'

// 获取我的收藏/足迹列表
export const collect = (data) => {
    return request({
        url: '/collect/user',
        method: 'get',
        params: data

    })
}

// 删除我的收藏/足迹列表
export const delcollect = (productIds, type) => {
    return request({
        url: `/collect/dels/${productIds}`,
        method: 'post',
        data: {
            category: type
        }

    })
}
export default {
    collect,
    delcollect
}