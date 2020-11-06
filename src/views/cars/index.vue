<template>
  <div class="cars-view">
    <div class="car-swiper-warp">
      <swiper ref="mySwiper" :options="swiperOptions">
        <!-- 汽车列表 -->
        <swiper-slide>
          <CarItem height="800px" />
        </swiper-slide>
        <swiper-slide>
          <CarItem />
        </swiper-slide>
        <swiper-slide>
          <CarItem />
        </swiper-slide>
        <swiper-slide>
          <CarItem />
        </swiper-slide>
      </swiper>
      <div slot="button-prev" class="swiper-button-prev" />
      <div slot="button-next" class="swiper-button-next" />
    </div>
  </div>
</template>

<script>
import CarItem from '@c/carList/index'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
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
      }
    }
  },
  methods: {
    topath() {
      this.$router.push({
        name: 'User'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./cars";
</style>
