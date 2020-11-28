<template>
  <div>
    <!-- cars data渲染 -->
    <Cars ref="cars" />
    <!-- 导航 -->
    <Navbar />
    <!-- 地图 -->
    <Map ref="map" @callbackComponent="callbackComponent" />
    <!-- Login -->
    <Login />
    <!-- 会员 -->
    <div id="children-view" :class="{ open: show }">
      <router-view />
    </div>

  </div>
</template>

<script>
import Map from '../aMap/index'
import Cars from '../cars/index'
import Navbar from '@c/Navbar'
import Login from './login'
// API
import { GetParking } from '@/api/parking'
export default {
  name: 'Index',
  components: {
    Map,
    Cars,
    Login,
    Navbar
  },
  data() {
    return {}
  },
  computed: {
    show() {
      const rotuer = this.$route
      return rotuer.name !== 'Index'
    }
  },

  watch: {},
  mounted() {
    document.addEventListener('mouseup', e => {
      const userCon = document.getElementById('children-view')
      if (userCon && !userCon.contains(e.target)) {
        const routeName = this.$route.name
        if (routeName === 'Index') {
          return false
        }
        this.$router.push({
          name: 'Index'
        })
      }
    })
    const rotuerName = this.$route.name
    return rotuerName !== 'Index'
  },

  methods: {
    /** 地图初始化完成回调 */
    callbackComponent(params) {
      params.function && this[params.function]()
    },
    mapLoad() {
      GetParking().then(res => {
        console.log('mapLoad -> res', res)
        /* 地图加载完成后--执行的方法 */
        this.getparking() // 查询停车场列表
      })
    },
    /* 查询停车场列表 */
    getparking() {
      GetParking()
        .then(result => {
          const resData = result.data.data
          resData.forEach(item => {
            item.position = item.lnglat.split(',')
            item.offset = [-29, -59]
            item.offsetTxt = [-29, -59]
            item.content =
              '<img src="' +
              require('@/assets/images/parking-location.png') +
              '" >'
            item.contentTxt = `<div  class="carsNum">${item.carsNumber}</div>`
            item.events = {
              click: e => {
                this.$store.commit('app/REPUEST_CAR_LIST', true)
                /* 路线规划 */
                this.navigation(e)
                /* 获取停车场车辆 */
                this.getCarsList(e)
              }
            }
          })
          /* 添加停车场 覆盖物 */

          /* 调用子组件方法 -存储数据 */
          this.$refs.map && this.$refs.map.saveData({
            key: 'parkingList',
            value: resData
          })
        })
        .catch(() => {})
    },
    /* 显示导航规划 */
    navigation(e) {
      /* 获取当前点击停车场数据 */
      const curr_click_data = e.target.getExtData()
      /* 调用子组件方法 -存储数据 */
      this.$refs.map && this.$refs.map.saveData({
        key: 'curr_parkingInfo',
        value: curr_click_data
      })
      /* 调用子组件方法 - 路线规划 */
      this.$refs.map && this.$refs.map.navigation(curr_click_data)
    },
    /* 获取停车场车辆 */
    getCarsList(e) {
      /* 获取当前点击停车场数据 */
      const curr_click_data = e.target.getExtData()
      /* 调用子组件方法 - 停车场车辆列表 */
      this.$refs.cars && this.$refs.cars.getCarsList(curr_click_data.id)
    },
    /* 清空车辆列表 */
    clearCarList() {
      this.$refs.cars.$data.cars_list = []
    }
  }
}
</script>

<style lang="scss">
#children-view {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -600px;
  z-index: 101;
  width: 410px;
  background-color: #34393f;
  color: #fff;
  @include webkit(transition, all 0.3s ease);
  @include webkit(box-shadow, -5px 0 38px 0 rgba(0, 0, 0, 0.1));
  &.open {
    right: 0;
  }
}
.carsNum {
  color: #fff;
  font-weight: bold;
  width: 59px;
  height: 59px;
  line-height: 52px;
  text-align: center;
}
</style>
