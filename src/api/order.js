import service from '../utils/request'

/**
 * 获取支付订单状态
 */
export function GETORDERSTATUS(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/orderStatus/`,
    data
  })
}
/**
 * 获取租车订单
 */
export function GETORDERLIST(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/orderList/`,
    data
  })
}

/*
 * 查询是否有订单存在
 */
export function GETCARSACTIVATION(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/carsActivation/`,
    data
  })
}

/*
 * 获取订单详情
 */
export function GETORDERDETAILED(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/orderDetailed/`,
    data
  })
}

/*
 * 取车
 */
export function CARSGET(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/carsGet/`,
    data
  })
}
/*
 * 还车
 */
export function CARSRETURN(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/carsReturn/`,
    data
  })
}
/*
 * 还车
 */
export function CARSRETURNS(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/carsReturnS/`,
    data
  })
}
/*
 * 取消
 */
export function CARSCANCEL(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/carsCancel/`,
    data
  })
}
