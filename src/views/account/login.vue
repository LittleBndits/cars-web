<template>
  <div class="user-container">
    <Back>
      <template v-slot:backRight>
        <div>
          <router-link to="/register" class="color-white opactiy-4">注册</router-link>
        </div>
      </template>
    </Back>
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <UserName :value.sync="form.username" />
        <Password :value.sync="form.password" :pw-comfirm="form.passwordComfirm" />
        <el-form-item>
          <el-button type="primary" class="btn-back" @click="onSubmit('form')">确定</el-button>
        </el-form-item>
      </el-form>
      <div class="text-r">
        <router-link to="/forget" class="color-white opactiy-4">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>
<script>
/* sha1 */
import sha1 from 'js-sha1'
import UserName from '@/components/account/username'
import Password from '@/components/account/password'
export default {
  name: 'Login',
  components: { UserName, Password },
  data() {
    return {
      form: {
        username: '', // 用户名
        password: '' // 密码
      }
    }
  },
  methods: {
    /* 登录 */
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const params = {
            username: this.form.username,
            password: sha1(this.form.password)
          }
          this.$store
            .dispatch('account/loginActions', params)
            .then((result) => {
              this.$router.push('/')
            })
            .catch(() => {})
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>
