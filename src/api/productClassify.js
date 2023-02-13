// 导入axios实列
import request from '@/utils/request'

// 商品分类
export const getDate = () => {
    return request({
        url: '/category',
        method: 'get'
    })
}

export default {
    getDate
}