const state = {
  routerName: ''
}
const mutations = {
  /* 设置路由 title */
  SET_ROUTER_TITLE(state, value) {
    state.routerName = value
  },
  CLEAR_CAR_LIST(state, payload) {
    state.isclearcarlist = payload
  },
  REPUEST_CAR_LIST(state, payload) {
    state.isRepuestCarlist = payload
  }
}
const getters = {}
const actions = {}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  isclearcarlist: false,
  isRepuestCarlist: false
}
