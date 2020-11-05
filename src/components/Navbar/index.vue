<template>
  <div class="nav-main">
    <ul>
      <li>
        <!-- 帮助 -->
        <i class="icon icon-w-44 icon-help" />
      </li>
      <li>
        <!-- 搜索 -->
        <i class="icon icon-w-44 icon-search" />
      </li>
      <li>
        <i class="icon icon-w-44 iconBtn">选择车辆</i>
      </li>
      <li>
        <!-- 定位 -->
        <i class="icon icon-w-44 icon-location" @click="selflocation" />
      </li>
      <li>
        <!-- 会员 -->
        <i class="icon icon-w-44 icon-user" @click="toUser" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {}
  },
  methods: {
    toUser() {
      this.$router.push({
        name: 'User'
      })
    },
    /* 定位 */
    selflocation() {
      this.$store.commit('location/SELF_LOCATION')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-main {
  position: fixed;
  bottom: 60px;
  left: 0;
  text-align: center;
  width: 100%;
  z-index: 10;
  ul {
    width: 540px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: auto;
  }
}
</style>
