<template>
  <div class="user-container">
    <Back titlename="安全设置" />
    <ul class="group-links">
      <router-link to="/password" class="arrow">
        修改登录密码
      </router-link>
      <router-link to="/capital" class="arrow">
        设置资金密码
      </router-link>
      <router-link to="/bank" class="arrow">
        绑定银行卡号
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Safe',
  data() {
    return {}
  }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>
