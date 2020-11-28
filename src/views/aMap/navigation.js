/**
 *  導航
 * @param {*} params
 */
// 步行导航
let walking = null
export function WALKING(params) {
  if (!walking) {
    walking = new AMap.Walking({
      map: params.map,
      hideMarkers: true // 隐藏起始图标
    })
  }
  console.log('WALKING -> params', params)
  // 根据起终点坐标规划步行路线
  walking.search(params.position_start, params.position_end, (status, result) => {
    // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
    if (status === 'complete') {
      console.log('walking.search -> complete', '绘制步行路线完成')
      /* 将结果返回出去 */
      params.complete(result)
    } else {
      console.log('walking.search -> error', '步行路线数据查询失败')
    }
  })
}

export function CLEARWALK(params) {
  if (walking) {
    walking.clear()
  }
}