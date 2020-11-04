<template>
  <div>
    <!-- cars data渲染 -->
    <!-- <Cars /> -->
    <!-- 导航 -->
    <Navbar />
    <!-- 地图 -->
    <Map /> 
    <!-- Login -->
    <Login></Login>
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
      return rotuer.name === 'Index' ? false : true
    }
  },
  mounted() {
    document.addEventListener('mouseup', e => {
      const userCon = document.getElementById('children-view')
      if (userCon && !userCon.contains(e.target)) {
        this.$router.push({
          name: 'Index'
        })
      }
    })
  },
  watch: {}
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
</style>
