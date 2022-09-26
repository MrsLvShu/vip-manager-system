import request from "@/utils/request";
export const goodsList = (page, size, data) => {
    return request({
        url: `/goods/list/search/${page}/${size}`,
        method: "post",
        data
    })
}
//删除接口
export const deleteGoods = (id) => {
    return request({
        url: `/goods/${id}`,
        method: "delete"
    })
}
//新增接口
export const addGoods = (data) => {
    return request({
        url: '/goods',
        method: "post",
        data
    })
}
//编辑接口
export const editGoods = (id, data) => {
    return request({
        url: `/goods/${id}`,
        method: "put",
        data
    })
}
//查询单个接口
export const findGoods = (id) => {
    return request({
        url: `/goods/${id}`,
        method: "get"
    })
}