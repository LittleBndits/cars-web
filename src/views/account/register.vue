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
          <UserName :value.sync="form.username" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="确认密码" />
        </el-form-item>
        <el-form-item>
          <Code :is-phone="form.username" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-back" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import UserName from '@/components/account/username'
import Code from '@/components/code/code'
export default {
  name: 'Register',
  components: { UserName, Code },
  data() {
    return {
      form: {
        username: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      console.log('submit!')
    }
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>
