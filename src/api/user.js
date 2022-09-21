import request from '../utils/request'
export const login = (data) => {
   return request({
        url: '/login',
        method: "post",
        data
    })
}
export const admin = () => {
    return request({
        url: 'http://vue.mengxuegu.com/pro-api/user/info/admin',
        method: "get",
    })
}