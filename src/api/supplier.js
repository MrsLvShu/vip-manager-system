import request from "@/utils/request";
export const supplierList = (page, size, data) => {
    return request({
        url: `/supplier/list/search/${page}/${size}`,
        method: "post",
        data
    })
}