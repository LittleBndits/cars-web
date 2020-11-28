<template>
  <div class="user-container">
    <div class="user-info">
      <img src="../../assets/images/face.jpg" alt="">
      <div class="meta">
        <h4>{{ username }}</h4>
        <span>文明驾驶 <strong>0</strong></span>
      </div>
    </div>
    <ul class="group-links">
      <router-link to="aa" tag="a" class="arrow">
        <i class="icon icon-router-link-001" />
        我的账户
      </router-link>
      <router-link to="aa" tag="a" class="arrow">
        <i class="icon icon-router-link-002" />
        租车订单
      </router-link>
      <router-link to="aa" tag="a" class="arrow">
        <i class="icon icon-router-link-003" />
        实名认证
      </router-link>
      <router-link to="/safe" tag="a" class="arrow">
        <i class="icon icon-router-link-004" />
        安全设置
      </router-link>
      <router-link to="aa" tag="a" class="arrow">
        <i class="icon icon-router-link-005" />
        帮助中心
      </router-link>
    </ul>
    <div class="exitBtn" @click="checkout">登出</div>
  </div>
</template>
<script>
export default {
  name: 'User',
  data() {
    return {
      username: this.$store.state.account.accountUsername
    }
  },
  methods: {
    /* 登出 */
    checkout() {
      this.$store.dispatch('account/logoutActions').then(() => {
        this.$router.replace({
          name: 'Index'
        })
      })
    }
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>
