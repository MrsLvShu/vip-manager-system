import request from "@/utils/request";
export const staffList = (page, size, data) => {
    return request({
        url: `/staff/list/search/${page}/${size}`,
        method: "post",
        data
    })
}