import request from '../utils/request'
export const login = (data) => {
   return request({
       url: 'http://ceshi5.dishait.cn/admin/login',
        method: "post",
        data
    })
}
export const admin = () => {
    return request({
        url: '/user/info/admin',
        method: "get",
    })
}
export const quite = () => {
    return request({
        url: '/user/logout',
        method: "post",
    })
}