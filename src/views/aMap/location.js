
/**
 *浏览器定位
 * @param {*} params
 */
let geolocation = null
export function SELFLOCATION(params) {
  if (!geolocation) {
    geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位，默认:true
      timeout: 10000, // 超过10秒后停止定位，默认：5s
      zoomToAccuracy: true, // 定位成功后是否自动调整地图视野到定位点
      showMarker: false, // 定位成功后在定位到的位置显示点标记，默认：true
      showButton: false // 显示定位按钮，默认：true
    })
  }
  params.map.addControl(geolocation)
  geolocation.getCurrentPosition()
  if (params.complete && typeof params.complete === 'function') {
    AMap.event.addListener(geolocation, 'complete', params.complete)// 返回定位信息
  }
  if (params.complete && typeof params.complete === 'function') {
    AMap.event.addListener(geolocation, 'error', params.error) // 返回定位出错信息
  }
}
