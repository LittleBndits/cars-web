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
    <div v-if="order_data && order_data.order_no" class="carsOrder">
      <router-link :to="{path:'/orderDetailed',query:{order_no:order_data.order_no}}" style="color:#fff">您有一个订单正在进行 </router-link>
    </div>
    <div v-if="order_data" class="btn-G">
      <div v-if="order_data.order_status==='RETURN'" class="parkingList">
        <label for="">请选择停车场：</label>
        <el-button v-for="item in parkingIds" :key="item.id" size="mini" :type="item==parkingId?'primary':''" @click="checkparking(item)">{{ item }}</el-button>
      </div>
      <el-button v-if="order_data.order_status==='WAIT'" type="primary" size="small" @click="carsget">取车</el-button>
      <el-button v-if="order_data.order_status==='WAIT'" type="danger" size="small" @click="carscancel">取消</el-button>
      <el-button v-if="order_data.order_status==='RETURN'" type="success" size="small" @click="carsreturn">还车</el-button>
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
import { GETCARSACTIVATION, CARSGET, CARSRETURNS, CARSCANCEL } from '@/api/order'
export default {
  name: 'Index',
  components: {
    Map,
    Cars,
    Login,
    Navbar
  },
  data() {
    return {
      order_data: JSON.parse(localStorage.getItem('order_data')),
      parkingId: ''
    }
  },
  computed: {
    show() {
      const rotuer = this.$route
      return rotuer.name !== 'Index'
    },
    parkingIds() {
      return this.$store.state.common.parking_Ids
    }
  },

  watch: {},
  beforeMount() {
    !this.order_data && this.getcarsactivation()
  },
  mounted() {
    document.addEventListener('mouseup', (e) => {
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
      GetParking().then((res) => {
        /* 地图加载完成后--执行的方法 */
        this.getparking() // 查询停车场列表
      })
    },
    /* 查询停车场列表 */
    getparking() {
      GetParking()
        .then((result) => {
          const resData = result.data.data
          resData.forEach((item) => {
            item.position = item.lnglat.split(',')
            item.offset = [-29, -59]
            item.offsetTxt = [-29, -59]
            item.content =
              '<img src="' +
              require('@/assets/images/parking-location.png') +
              '" >'
            item.contentTxt = `<div  class="carsNum">${item.carsNumber}</div>`
            item.events = {
              click: (e) => {
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
          this.$refs.map &&
            this.$refs.map.saveData({
              key: 'parkingList',
              value: resData
            })
          const parkingIds = resData.map((item) => item.id)
          this.$store.commit('common/SET_PARKING_IDS', parkingIds)
        })
        .catch(() => {})
    },
    /* 显示导航规划 */
    navigation(e) {
      /* 获取当前点击停车场数据 */
      const curr_click_data = e.target.getExtData()
      /* 调用子组件方法 -存储数据 */
      this.$refs.map &&
        this.$refs.map.saveData({
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
    },

    /* 查是否有订单车辆 */
    getcarsactivation() {
      GETCARSACTIVATION().then((result) => {
        const resData = result.data
        if (resData) {
          localStorage.setItem('order_data', JSON.stringify(resData))
        }
      })
    },
    /* 取车 */
    carsget() {
      const { cars_id, order_no } = this.order_data
      CARSGET({ cars_id, order_no }).then((result) => {
        if (result.data && result.data.order_status) {
          this.$set(this.order_data, 'order_status', result.data.order_status)
          localStorage.setItem('order_data', this.order_data)
        }
        this.$message.success(result.message)
      })
    },
    /* 还车 */
    // carsreturn() {
    //   const { cars_id, order_no } = this.order_data
    //   CARSRETURN({ cars_id, order_no }).then((result) => {
    //     this.order_data = null
    //     localStorage.removeItem('order_data')
    //     this.$message(result.message)
    //   })
    // },
    /* 还车 -停车场 */
    carsreturn() {
      const { cars_id, order_no } = this.order_data
      CARSRETURNS({ parking_id: this.parkingId, cars_id, order_no }).then((result) => {
        this.order_data = null
        localStorage.removeItem('order_data')
        this.$message(result.message)
      })
    },
    /* 取消 */
    carscancel() {
      const { cars_id, order_no } = this.order_data
      CARSCANCEL({ cars_id, order_no }).then((result) => {
        this.order_data = ''
        localStorage.removeItem('order_data')
        this.$message(result.message)
      })
    },
    /* 选择停车场-还车 */
    checkparking(item) {
      this.parkingId = item
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
.carsOrder {
  position: fixed;
  top: 30px;
  left: 30px;
  background-color: rgba(0, 0, 0, 0.76);
  border-radius: 99px;
  padding: 8px 16px;
  font-size: 12px;
  color: #fff;
}
.btn-G {
  position: fixed;
  top: 70px;
  left: 30px;
}
.parkingList{
  margin-bottom: 10px;
}
</style>
