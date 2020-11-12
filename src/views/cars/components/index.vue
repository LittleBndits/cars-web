<template>
  <div class="carList">
    <section class="car-item" @click="showCarDetail">
      <header>
        <h4 class="car-logo">
          <img :src="carInfo.imgUrl" height="34" alt="">
          <span>{{ carInfo.carsMode }}</span>
        </h4>
        <p class="attr"> <b>{{ carInfo | energyType }}</b> <span>{{ carInfo | seatNum }}</span></p>
      </header>
      <div class="car-content">
        <div class="inof">
          <div>
            <div class="car-number">{{ carInfo.carsNumber }}</div>
            <div class="car-Power">
              <ul :class="carInfo.oil | electricNumber">
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
              </ul>
              <div class="car-km">
                <span>約</span>
                <strong>{{ carInfo.countKm }}</strong>
                <span>Km</span>
              </div>
            </div>
          </div>
        </div>
        <img :src="carInfo.carsImg" height="120" alt="">
      </div>
      <footer>
        <a href="javascript:void(0);" class="parking-link">{{ carInfo.parkingName }}</a>
      </footer>
    </section>
    <!-- 汽车详情 -->
    <section v-if="car_details" class="car-item car-item-details" :style="'height:' + car_details_heigth">
      <div class="scroll">
        <h4 class="column">
          {{ carInfo.parkingName }}
          <i class="close" @click="closeCarDetail" />
        </h4>
        <header>
          <h4 class="car-logo">
            <img :src="carInfo.imgUrl" height="34" alt="">
            <span>{{ carInfo.carsMode }}</span>
          </h4>
          <p class="attr"><b>{{ carInfo | energyType }}</b> <span>{{ carInfo | seatNum }}</span></p>
        </header>
        <img :src="carInfo.carsImg" alt="" height="221" style="margin: auto">
        <div class="clearfix">
          <div class="pull-left font24">{{ carInfo.carsNumber }}</div>
          <div class="car-km pull-right">
            <span>約</span>
            <strong>{{ carInfo.countKm }}</strong>
            <span>Km</span>
          </div>
        </div>
        <div class="car-electric-box">
          <div class="p-r">
            <span class="e-high" :style="`width:${carInfo.oil}%`" />
            <span class="e-bg" />
          </div>
        </div>
        <div class="info color-main text-c">
          取车约支付12.0元停车费，实际补贴12.0元
        </div>
        <ul class="car-type-list">
          <li v-for="item in cars_lease" :key="item.carsLeaseTypeId" :class="{'current':cars_lease_currId===item.carsLeaseTypeId}" @click="carsleaseClick(item)">
            <span class="type-name">{{ item.carsLeaseTypeName }}</span>
            <span class="type-price">
              {{ item.price }}元/1天
            </span>
          </li>
        </ul>
        <div class="clause-dec clearfix">
          <span class="pull-left">参保《全面保障服务》用车更放心</span>
          <i class="pull-right current" />
        </div>
        <i class="icon iconBtn text-c">
          预约用车
        </i>
      </div>
    </section>
  </div>
</template>

<script>
import { formatVal } from '@/utils/format'
import { GETCARSLEASE } from '@/api/cars'
export default {
  name: 'CarList',
  filters: {
    /* 剩余有量/电量 */
    electricNumber(val) {
      const surplusVal = Math.round(val / 10)
      return `active-li-${surplusVal}`
    },
    /* 汽车类型 */
    energyType(val) {
      const value = formatVal({
        data: val,
        parentAttr: 'basics',
        childAttr: 'energy_type'
      })
      return value ? `${value}汽车 ` : ''
    },
    /* 汽车座位 */
    seatNum(val) {
      const value = formatVal({
        data: val,
        parentAttr: 'carsBody',
        childAttr: 'car_seat_number'
      })
      return value ? `${value}座` : ''
    }
  },
  props: {
    height: {
      type: String,
      default: '750px'
    },
    carInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      car_details: false,
      car_details_heigth: 0,
      // 定时器
      timer: null,
      // 租赁类型
      cars_lease: [],
      cars_lease_data: '',
      cars_lease_currId: ''
    }
  },
  watch: {
    carInfo: {
      handler(val) {},
      immediate: true
    }
  },
  methods: {
    /* 显示车辆详情 */
    showCarDetail() {
      const viewHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      this.car_details = true
      /* 查询车辆租赁类型 */
      this.getcarslease()
      this.timer = setTimeout(() => {
        this.car_details_heigth = viewHeight - 140 + 'px'
        clearInterval(this.timer)
      }, 10)
    },
    /* 关闭车辆详情 */
    closeCarDetail() {
      this.car_details_heigth = '0'
      this.timer = setTimeout(() => {
        this.car_details = false
        clearInterval(this.timer)
      }, 100)
    },
    /* 查询车辆租赁类型 */
    getcarslease() {
      if (this.cars_lease.length > 0) {
        return false
      }
      GETCARSLEASE({ carsId: this.carInfo.id })
        .then((result) => {
          const resData = result.data.data
          if (resData) {
            this.cars_lease = resData
            this.cars_lease_currId = resData[0].carsLeaseTypeId
          }
        })
        .catch(() => {})
    },
    /* 选择租赁类型 */
    carsleaseClick(data) {
      console.log('carsleaseClick -> data', data)
      this.cars_lease_data = data
      this.cars_lease_currId = data.carsLeaseTypeId
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
