/*
 * @Author: Qiu-Long.Chan
 * @Date: 2020-11-10 10:42:31
 * @Last Modified by: Qiu-Long.Chan
 * @Last Modified time: 2020-11-10 11:04:54
 */

/* 车辆属性数据类型转换 */
export function formatCarsAttr(val) {
  if (!val) {
    return ''
  }
  return val.carsAttr && JSON.parse(val.carsAttr)
}

/* 车辆属性值格式化 */
export function formatVal(params) {
  const carAttr = formatCarsAttr(params.data)
  if (carAttr && carAttr[params.parentAttr] && carAttr[params.parentAttr][params.childAttr]) {
    return carAttr[params.parentAttr][params.childAttr]
  }
  return ''
}
