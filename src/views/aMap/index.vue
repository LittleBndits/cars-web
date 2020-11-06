<template>
  <div class="amap-wrap">
    <el-amap vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
      <!-- 覆盖物 定位点 -圆 -->
      <el-amap-circle v-for="item in circle" ref="circle" :key="item.id" :center="item.center" :radius="item.radius" :fill-color="item.color" :stroke-color="item.color" :stroke-opacity="item.strokeOpacity" :stroke-weight="item.strokeWeight" />
      <!-- 覆盖物 停车场- marker -->
      <el-amap-marker v-for="(marker, index) in parkingList" :key="marker.id" :offset="marker.offset" :position="marker.position" :vid="index" :content="marker.content" />
      <!-- 覆盖物 停车场 停放车辆- marker -->
      <el-amap-marker v-for="(marker, index) in parkingList" :key="marker.id + index" :ext-data="marker" :events="marker.events" :offset="marker.offsetTxt" :position="marker.position" :vid="index" :content="marker.contentTxt" />
      <!-- 覆盖物 停车场信息- marker -->
      <el-amap-marker v-for="(marker, index) in parkingInfo" :key="marker.id+index" :events="marker.events" :offset="marker.offset" :position="marker.position" :vid="index" :content="marker.content" />
    </el-amap>
    <div id="panel" />
  </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
import { SELFLOCATION } from './location'
import { WALKING, CLEARWALK } from './navigation'
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
      parkingList: [],
      // 停车场信息
      parkingInfo: []
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
    /**
     * 初始化地图
     */
    initMap() {
      /* 获取地图实例 */
      this.map = amapManager.getMap()
      /* 浏览器定位 */
      this.selflocation()
      /* 调用父组件方法 */
      this.$emit('callbackComponent', { function: 'mapLoad' })
    },
    /**
     * 数据存储
     */
    saveData(params) {
      if (params.value) {
        this[params.key] = params.value
      }
    },
    /**
     * 浏览器定位
     */
    selflocation() {
      SELFLOCATION({
        map: this.map,
        complete: data => this.selflocationComplete(data)
      })
    },
    /* 定位成功-回调 */
    selflocationComplete(data) {
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
    /**
     * 路线规划
     */
    navigation(data) {
      this.curr_parkingInfo = data
      if (this.curr_position) {
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
      let distance = 0
      if (reslut.routes[0]) {
        distance = reslut.routes[0].distance / 1000
      }
      /* 停车场信息 html */
      const html = `<div class="infonBox">
                    <h3 class="parkingN">${data.parkingName}</h3>
                    <div class="infonBox_in">
                      <span><b>${data.carsNumber} </b> 辆车</span>
                      <span class="line"></span>
                      <span>距离你 <b> ${distance} </b> 公里</span>
                    </div>
                  </div>`
      this.parkingInfo = [
        {
          position: data.position,
          offset: [-32, -60],
          content: html,
          events: {
            dblclick: () => {
              this.dblclickInfoView()
            }
          }
        }
      ]
    },
    dblclickInfoView() {
      console.log('dblclickInfoView')
      CLEARWALK()
      this.parkingInfo = []
    }
  }
}
</script>

<style lang="scss" scope>
.amap-wrap {
  height: 100vh;
}
@import './style.scss';
</style>
