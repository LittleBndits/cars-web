<template>
  <div class="user-container">
    <Back>
      <template v-slot:backRight>
        <div>
          <router-link to="/login" class="color-white opactiy-4">登录</router-link>
        </div>
      </template>
    </Back>
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <UserName :value.sync="form.username" />
        <Password :value.sync="form.password" :pw-comfirm="form.passwordComfirm" />
        <PasswordComfirm :value.sync="form.passwordComfirm" :pw-comfirm="form.password" />
        <Code :is-phone="form.username" :code-value.sync="form.code" />
        <el-form-item>
          <el-button type="primary" class="btn-back" @click="onSubmit('form')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
/* sha1 加密 */
import sha1 from 'js-sha1'
import UserName from '@/components/account/username'
import Password from '@/components/account/password'
import PasswordComfirm from '@/components/account/passwordComfirm'
import Code from '@/components/code/code'
/* Api */
import { Forget } from '@/api/account'
export default {
  name: 'Forget',
  components: { UserName, Code, Password, PasswordComfirm },
  data() {
    return {
      form: {
        username: '', // 用户名
        password: '', // 密码
        passwordComfirm: '', // 确认密码
        code: '' // 验证码
      }
    }
  },
  methods: {
    /* 修改密码 */
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const params = {
            username: this.form.username,
            password: sha1(this.form.password),
            code: this.form.code
          }
          this.$store
            .dispatch('account/forgetActions', params)
            .then((result) => {
              if (result.resCode === 0) {
                this.$message.success(result.message)
                this.$router.push('/login')
              }
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
