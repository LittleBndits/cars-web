<template>
  <div class="amap-wrap">
    <el-amap vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
      <!-- 定位点 -圆 -->
      <el-amap-circle v-for="item in circle" :key="item.id" :center="item.center" :radius="item.radius" :fillColor="item.color" :strokeColor="item.color" :strokeOpacity="item.strokeOpacity" :strokeWeight="item.strokeWeight">
      </el-amap-circle>
    </el-amap>
  </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
let amapManager = new AMapManager();
export default {
  name: "Amap",
  data() {
    const _this = this;
    return {
      map: null,
      amapManager,
      center: [121.59996, 31.197646],
      zoom: 18,
      events: {
        init(o) {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          });
        }
      },
      // 定位点参数
      circle: []
    };
  },
  methods: {
    initMap() {
      this.map = amapManager.getMap();
      /** 地图初始化完成 */
      this.$emit('callbackComponent',{
        function:'mapLoad'
      })
      /**
       * 浏览器定位
       */
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：5s
        buttonPosition: "RB", //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(-50, 0), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        markerOptions: {
          //自定义标记点样式
          content: " "
        }
      });
      this.map.addControl(geolocation);
      geolocation.getCurrentPosition((status, result) => {
        if (status == "complete") {
          const json = {
            radius: 4,
            color: "#393e43",
            strokeOpacity: "0.2",
            strokeWeight: "30"
          };
          json.center = [result.position.lng, result.position.lat];
          this.circle.push(json);
        } else {
        }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scope>
.amap-wrap {
  height: 100vh;
}
</style>
