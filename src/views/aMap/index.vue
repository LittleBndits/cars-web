<template>
  <div class="amap-wrap">
    <el-amap vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
      <!-- 覆盖物 定位点 -圆 -->
      <el-amap-circle v-for="item in circle" ref="circle" :key="item.id" :center="item.center" :radius="item.radius" :fill-color="item.color" :stroke-color="item.color" :stroke-opacity="item.strokeOpacity" :stroke-weight="item.strokeWeight" />
      <!-- 覆盖物 停车场- marker -->
      <el-amap-marker v-for="(marker, index) in parkingList" :key="marker.id" :offset="marker.offset" :position="marker.position" :vid="index" :content="marker.content" />
      <el-amap-marker v-for="(marker, index) in parkingList" :key="marker.id + index" :ext-data="marker" :events="marker.events" :offset="marker.offsetTxt" :position="marker.position" :vid="index" :content="marker.contentTxt" />
    </el-amap>
    <div id="panel" />
  </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
import { SELFLOCATION } from './location'
import { WALKING } from './navigation'
const amapManager = new AMapManager()
export default {
  name: 'Amap',
  data() {
    const _this = this
    return {
      map: null,
      amapManager,
      center: [121.59996, 31.197646],
      zoom: 22,
      events: {
        init(o) {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap()
          })
        }
      },
      curr_parkingInfo: {}, // 当前点击停车场信息
      curr_position: [], // 浏览当前定位
      // 定位点参数
      circle: [],
      // 停车场列表参数
      parkingList: []
    }
  },
  watch: {
    '$store.state.location.selfLocation': {
      /* 监听是否点击定位按钮 */
      handler() {
        // 重新定位
        this.selflocation()
      }
    }
  },
  mounted() {},
  methods: {
    initMap() {
      /* 获取地图实例 */
      this.map = amapManager.getMap()

      /** 地图初始化完成 -回调---------------------start*/

      /* 浏览器定位 */
      this.selflocation()
      /* 调用父组件方法 */
      console.log('地图初始化完成')
      this.$emit('callbackComponent', { function: 'mapLoad' })

      /** 地图初始化完成 -回调---------------------end*/
    },
    /* 定位成功-回调 */
    onComplete(data) {
      this.circle = []
      const json = {
        radius: 4,
        color: '#393e43',
        strokeOpacity: '0.2',
        strokeWeight: '30'
      }
      const curr_position = [data.position.lng, data.position.lat] // 当前定位
      this.curr_position = curr_position
      json.center = curr_position
      this.circle.push(json)
    },
    /* 浏览器定位 */
    selflocation() {
      SELFLOCATION({
        map: this.map,
        complete: data => this.onComplete(data)
      })
    },
    /* 添加停车场覆盖物 */
    markerPinking(data) {
      this.parkingList = data
    },
    /* 导航 */
    navigation(data) {
      this.curr_parkingInfo = data
      if (this.curr_position) {
        this.$emit('callbackComponent', { function: 'getparking' })
        WALKING({
          map: this.map,
          position_start: this.curr_position,
          position_end: data.position,
          complete: reslut => this.wikingcomplete(reslut, data)
        })
      }
    },

    /* 导航成功-回调 */
    wikingcomplete(reslut, data) {
      setTimeout(() => {
        const copyParking = JSON.parse(JSON.stringify(this.parkingList))
        copyParking.map(item => {
          if (item.id === data.id) {
            item.content = '替换'
          }
          return item
        })
        this.parkingList = copyParking
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scope>
.amap-wrap {
  height: 100vh;
}
</style>
