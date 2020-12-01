import service from '../utils/request'

/**
 * 获取车辆列表
 */
export function GetCarsList(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/cars/`,
    data
  })
}

/**
 * 获取车辆租赁类型
 */
export function GETCARSLEASE(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/lease/`,
    data
  })
}
/**
 * 预约用车
 */
export function CONFIRMCARS(data) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/confirmCars/`,
    data
  })
}

