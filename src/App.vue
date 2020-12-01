<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    /* 监听页面点击 */
    document.addEventListener('mouseup', e => {
      /* 汽车列表dom */
      const carlistCon = document.getElementsByClassName('cars-view')[0]
      if (carlistCon && !carlistCon.contains(e.target)) {
        const isrequest = this.$store.state.app.isRepuestCarlist
        if (!isrequest) {
          this.$store.commit('app/CLEAR_CAR_LIST', true)
        }
      }
      /* 会员中心dom */
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
  }
}
</script>

<style lang="scss">
#app {
}
</style>

