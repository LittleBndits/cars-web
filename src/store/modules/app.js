const state = {
  routerName: ''
}
const mutations = {
  /* 设置路由 title */
  SET_ROUTER_TITLE(state, value) {
    state.routerName = value
  }
}
const getters = {}
const actions = {}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
