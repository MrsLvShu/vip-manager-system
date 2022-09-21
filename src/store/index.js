import Vue from 'vue'
import Vuex from 'vuex'
import {
  getToken, getUserInfo, setToken,setUserInfo} from '../utils/auth'
import {login,admin} from '../api/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken() || '',
    userInfo:getUserInfo || ''
  },
  getters: {
    token(state) {
      return state.token
    },
    userInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    SET_USERINFO(state, userinfo) {
      state.userInfo = userinfo
      setUserInfo(userinfo)
    }
  },
  actions: {
    async DIS_SET_TOKEN({commit},ruleForm) {
      try {
        const response = await login(ruleForm)
        console.log(response,'token');
        commit('SET_TOKEN', response.token)
        return response.token
      } catch (error) {
        console.log(error.message)
      }
    },
    async DIS_SET_USERINFO({ commit }) {
      try {
        const res = await admin()
        console.log(res,'admin');
        commit('SET_USERINFO', res)
        return res
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  modules: {
  }
})
