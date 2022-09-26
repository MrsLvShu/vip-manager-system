import request from "@/utils/request";
export const supplierList = (page, size, data) => {
    return request({
        url: `/supplier/list/search/${page}/${size}`,
        method: "post",
        data
    })
}
//删除接口
export const deleteSupplier = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: "delete"
    })
}
//新增接口
export const addSupplier = (data) => {
    return request({
        url: '/supplier',
        method: "post",
        data
    })
}
//编辑接口
export const editSupplier = (id, data) => {
    return request({
        url: `/supplier/${id}`,
        method: "put",
        data
    })
}
//查询单个接口
export const findSupplier = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: "get"
    })
}