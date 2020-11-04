/**
 * 高德地图 -组件
 */
import Vue from 'vue'

import VueAMap from 'vue-amap';
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德key
  key: '7ed8a9ad490826c5c845e9f14e52f6a1',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation'],
  v: '1.4.15', // 高德 sdk 版本
  uiVersion: '1.0.11' // ui版本号
});