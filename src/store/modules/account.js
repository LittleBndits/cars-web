/* cookies */
import { setUserToken, setUserName, removeUserName, removeUserToken, getUserToken, getUserName } from '@/utils/carsCookies'

/* Api */
import { Register, Login, Forget } from '@/api/account'

const state = {
  accountToken: '' || getUserToken(),
  accountUsername: '' || getUserName()
}
const mutations = {
  /* 存储token */
  SET_ACCOUNTTOKEN(state, value) {
    state.accountToken = value
  },
  /* 存储用户名称 */
  SET_ACCOUNTUSERNAME(state, value) {
    state.accountUsername = value
  }

}
const getters = {}
const actions = {
  /* 注册 */
  registerActions(context, params) {
    return new Promise((resolve, reject) => {
      // 成功 ：resolve; 失败：reject
      Register(params).then((result) => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /* 登录 */
  loginActions(context, params) {
    return new Promise((resolve, reject) => {
      // 成功 ：resolve; 失败：reject
      Login(params).then((result) => {
        if (result.data) {
          const token = result.data.token
          const username = result.data.username
          setUserToken(token)
          setUserName(username)
          context.commit('SET_ACCOUNTTOKEN', token)
          context.commit('SET_ACCOUNTUSERNAME', username)
        }
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /* 忘记密码 */
  forgetActions(context, params) {
    return new Promise((resolve, reject) => {
      // 成功 ：resolve; 失败：reject
      Forget(params).then((result) => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /* 登出 */
  logoutActions(context, params) {
    return new Promise((resolve, reject) => {
      removeUserName()
      removeUserToken()
      context.commit('SET_ACCOUNTTOKEN', '')
      context.commit('SET_ACCOUNTUSERNAME', '')
      resolve()
    })
  }

}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
