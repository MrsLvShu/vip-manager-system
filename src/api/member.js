import request from "@/utils/request";

//获取列表接口
export const memberList = (page,size,data) => {
    return request({
        url: `/member/list/search/${page}/${size}`,
        method: "post",
        data
    })
}
//删除接口
export const deleteMember = (id) => {
    return request({
        url: `/member/${id}`,
        method: "delete"
    })
}
//新增接口
export const addMember = (data) => {
    return request({
        url: '/member',
        method: "post",
        data
    })
}
//编辑接口
export const editMember = (id,data) => {
    return request({
        url: `/member/${id}`,
        method: "put",
        data
    })
}
//查询单个会员接口
export const findMember = (id) => {
    return request({
        url: `/member/${id}`,
        method: "get"
    })
}