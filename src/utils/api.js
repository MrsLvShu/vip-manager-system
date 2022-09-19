import $axios from '../utils/request'
export const login=(params)=>$axios.post('/login',params)