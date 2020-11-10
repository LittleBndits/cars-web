const state = {
  isclearcarlist: false,
  isRepuestCarlist: false
}
const mutations = {
  CLEAR_CAR_LIST(state, payload) {
    state.isclearcarlist = payload
  },
  REPUEST_CAR_LIST(state, payload) {
    state.isRepuestCarlist = payload
  }
}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
