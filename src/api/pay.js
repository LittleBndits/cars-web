import service from '../utils/request'

/**
 * 获取充值金额列表
 */
export function GETAMOUNTLIST(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/amount/`,
    data
  })
}

/**
 * 充值
 */
export function PAY(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/pay/`,
    data
  })
}

