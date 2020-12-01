<template>
  <el-form-item :rules="[{ required: true, validator: validatePassword, trigger: 'blur' }]" prop="password">
    <el-input v-model.trim="user_password" :placeholder="placeholder" clearable type="password" @input="enterInput" />
  </el-form-item>
</template>

<script>
/* 检验 */
import { validate_password } from '@/utils/validate'
export default {
  name: 'Password',
  props: {
    placeholder: {
      type: String,
      default: '密码'
    },
    pwComfirm: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      user_password: ''
    }
  },
  methods: {
    validatePassword(rule, value, callback) {
      if (!this.user_password) {
        return callback(new Error('请填写密码'))
      } else if (!validate_password(this.user_password)) {
        return callback(new Error('密码位6~20位的英文和数字组合'))
      } else {
        callback()
      }
    },
    enterInput(val) {
      this.$emit('update:value', this.user_password)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
