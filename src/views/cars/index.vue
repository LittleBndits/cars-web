<template>
  <div class="cars-view">
    <div class="car-swiper-warp">
      <swiper ref="mySwiper" :options="swiperOptions">
        <!-- 汽车列表 -->
        <swiper-slide v-for="item in cars_list" :key="item.id">
          <CarItem :car-info="item" height="800px" />
        </swiper-slide>

      </swiper>
      <div slot="button-prev" class="swiper-button-prev" />
      <div slot="button-next" class="swiper-button-next" />
    </div>
  </div>
</template>

<script>
import CarItem from './components/index'
/* swiper */
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
/* API */
import { GetCarsList } from '@/api/cars'
export default {
  name: 'Cars',
  components: {
    Swiper,
    SwiperSlide,
    CarItem
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 50,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      cars_list: []
    }
  },
  methods: {
    /* 打开会员中心 */
    topath() {
      this.$router.push({
        name: 'User'
      })
    },
    /* 获取停车场车辆列表 */
    getCarsList(parkingId) {
      GetCarsList({ parkingId })
        .then(result => {
          const resData = result.data.data
          resData && (this.cars_list = resData)
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
@import './cars';
</style>
