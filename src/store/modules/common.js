
const state = {
  upload_token: '',
  parking_Ids: ''
}
const mutations = {
  SET_UPLOAD_TOKEN(state, payload) {
    state.upload_token = payload
  },
  SET_PARKING_IDS(state, payload) {
    state.parking_Ids = payload
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
