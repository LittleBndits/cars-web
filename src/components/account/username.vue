<template>
  <div>
    <el-form-item :rules="[{ required: true, validator: validateUserName, trigger: 'blur' }]" prop="username">
      <el-input v-model.trim="user_name" maxlength="11" minlength="6" :placeholder="placeholder" @input="enterInput" />
    </el-form-item>
  </div>
</template>

<script>
/* 检验 */
import { validate_phone } from '@/utils/validate'
export default {
  name: 'UserName',
  props: {
    placeholder: {
      type: String,
      default: '手机号'
    }
  },
  data() {
    return {
      user_name: ''
    }
  },
  methods: {
    validateUserName(rule, value, callback) {
      if (!this.user_name) {
        return callback(new Error('请填写手机号'))
      } else if (!validate_phone(this.user_name)) {
        return callback(new Error('手机格式不正确'))
      } else {
        callback()
      }
    },
    enterInput(val) {
      this.$emit('update:value', this.user_name)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
