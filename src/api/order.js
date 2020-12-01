import service from '../utils/request'

/**
 * 获取订单状态
 */
export function GETORDERSTATUS(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/orderStatus/`,
    data
  })
}

