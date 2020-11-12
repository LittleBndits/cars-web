<template>
  <div>
    <el-input v-model.trim="user_name" maxlength="11" minlength="6" :placeholder="placeholder" @input="enterInput" />
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
      user_name: '',
      tips: '* 请输入正确的手机号'
    }
  },
  methods: {
    enterInput(val) {
      const isphone = validate_phone(val)
      const value = isphone ? val : ''
      this.$emit('update:value', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
