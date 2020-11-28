import service from '../utils/request'

/**
 * 获取停车场列表
 */
export function GetParking(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/parking/`,
    data
  })
}

