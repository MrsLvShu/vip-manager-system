import request from "@/utils/request";
export const memberList = (page,size,data) => {
    return request({
        url: `/member/list/search/${page}/${size}`,
        method: "post",
        data
    })
}