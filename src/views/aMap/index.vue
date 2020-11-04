<template>
  <div class="amap-wrap">
    <el-amap vid="amapDemo" :zoom="zoom" class="amap-demo"></el-amap>
  </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
export default {
  name: 'Amap',
  data() {
    return {
      map: null,
      zoom: 16
    }
  },
  mounted() {
    //加载地图
    lazyAMapApiLoaderInstance.load().then(() => {
      this.map = new AMap.Map('amapDemo', {
        center: new AMap.LngLat(114.047502, 22.544643),
        zoom: this.zoom
      })
    })
  }
}
</script>

<style lang="scss" scope>
.amap-wrap {
  height: 100vh;
}
</style>
