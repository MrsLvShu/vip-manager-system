import axios from 'axios'
import { Message ,Loading} from 'element-ui'
import store from '../store/index'
import { removeTAndU } from '@/utils/auth'
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
let loadinginstace
$axios.interceptors.request.use(config => {
    loadinginstace = Loading.service({
        lock: true,
        // text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(250, 250, 250, 0.8)',
        customClass: "osloading",
        fullscreen: true
    })
    const token = store.getters.token
    if (token) config.headers.Authorization = 'Bearer ' +token

    return config
})
$axios.interceptors.response.use(function (response) {
    setTimeout(() => {
        loadinginstace.close()
    }, 200);
    if (response.status < 400) {
        // console.log('res', response);
        // _showError(response.status,response.data.message)
        if (response.data.data) {
            return response.data.data
        } else {
            return response.data.msg
        }
    }
    if (response.status === 401) {
        store.commit('SET_TOKEN')
        store.commit('SET_USERINFO')
        removeTAndU()
        return
    }

        

    return response;
}, function (error) {
    console.log(error, 'error');
    loadinginstace.close()
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