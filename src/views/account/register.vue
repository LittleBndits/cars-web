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
        <el-form-item>
          <el-input v-model="form.name" placeholder="手机号" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="确认密码" />
        </el-form-item>
        <el-form-item>
          <button type="button" class="btn-vcode">获取验证码</button>
          <el-input v-model="form.name" placeholder="验证码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-back" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Password',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>
