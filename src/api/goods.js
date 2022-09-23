import request from "@/utils/request";
export const goodsList = (page, size, data) => {
    return request({
        url: `/goods/list/search/${page}/${size}`,
        method: "post",
        data
    })
}