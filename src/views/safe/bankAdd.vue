<template>
  <div class="user-container">
    <Back />
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="开户名" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.name" class="select-black">
            <el-option />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="预留手机号" />
        </el-form-item>
        <el-form-item>
          <button type="button" class="button-vcode">获取验证码</button>
          <el-input v-model="form.name" placeholder="验证码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button-black" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Password',
  components: { },
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
</style>
