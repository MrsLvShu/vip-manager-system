import axios from 'axios'
// 配置请求的跟路径
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API
const $axios = axios.create({
    // baseURL :process.env.VUE_APP_BASE_API,
    timeout:5000
})
$axios.interceptors.request.use(config => {
    config.headers.token = window.localStorage.getItem('token')
    return config
})
$axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

const request = (options) => {
    options.method = options.method || "get"
    if (options.method.toLowerCase() === "get") {
        options.params = options.data || options.params
        delete options.data
    }
    $axios.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API
    return $axios(options)
}
export default request