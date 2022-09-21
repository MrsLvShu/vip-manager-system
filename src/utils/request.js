import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store/index'
// 配置请求的跟路径
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API
const $axios = axios.create({
    // baseURL :process.env.VUE_APP_BASE_API,
    timeout:5000
})

const exceptionMessage = {
    1000: '用户名或密码错误',
    200:'登录成功',
}

$axios.interceptors.request.use(config => {
    const token = store.getters.token
    if (token) config.headers.Authorization = 'Bearer ' +token

    return config
})
$axios.interceptors.response.use(function (response) {
    if (response.status < 400) {
        // console.log('res', response);
        // _showError(response.status,response.data.message)
        return response.data.data
    }
        
    return response;
}, function (error) {
    console.log(error, 'error');
    if (error.response.status >=400) {
        _showError(error.response.data.errorCode, error.response.data.msg)
        return error
    }
    return Promise.reject(error);
});

const _showError = (errorCode,message) => {
    let title
    title = exceptionMessage[errorCode] || message || '发生未知错误'
    // if (errorCode == 200) {
    //     Message.success(title)
    //  return 
    // }
    console.log(title);
    Message.error(title)
}

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