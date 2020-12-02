const state = {
  meagess_item: {
    check_real_name: {
      msg: '您未实名认证，请先实名认证',
      router: '/authentication',
      type: 'identity'
    },
    check_cars: {
      msg: '您未上传驾驶证，请先上传驾驶证，审合通过后便可租车',
      router: '/authentication',
      type: 'drive'
    },
    gilding: {
      msg: '您还未交押金，请先缴纳押金哦',
      router: '/recharge',
      type: 'gilding'
    },
    illegalAmount: {
      msg: '您的预缴违章金额小于200元，请先预缴违章金额',
      router: '/recharge',
      type: 'illegal'
    },
    subscribe: {
      msg: '您已预约了其他车辆，请勿再次预约'
    }
  },
  /* 车辆状态 */
  // （待取车：WAIT，超时：OVERTIME，完成：OVER，取消：CANCEL，待还车：RETURN）
  order_status: {
    'WAIT': {
      zh: '待取车'
    },
    'OVERTIME': {
      zh: '超时'
    },
    'OVER': {
      zh: '完成'
    },
    'CANCEL': {
      zh: '取消'
    },
    'RETURN': {
      zh: '待还车'
    }
  }
}
const mutations = {}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
