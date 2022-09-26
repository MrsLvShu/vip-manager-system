import request from "@/utils/request";
export const staffList = (page, size, data) => {
    return request({
        url: `/staff/list/search/${page}/${size}`,
        method: "post",
        data
    })
}
//删除接口
export const deleteStaff = (id) => {
    return request({
        url: `/staff/${id}`,
        method: "delete"
    })
}
//新增接口
export const addStaff = (data) => {
    return request({
        url: '/staff',
        method: "post",
        data
    })
}
//编辑接口
export const editStaff = (id, data) => {
    return request({
        url: `/staff/${id}`,
        method: "put",
        data
    })
}
//查询单个接口
export const findStaff = (id) => {
    return request({
        url: `/staff/${id}`,
        method: "get"
    })
}