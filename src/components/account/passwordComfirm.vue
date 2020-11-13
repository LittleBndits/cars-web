<template>
  <el-form-item :rules="[{ required: true, validator:comfirmpassWord, trigger: 'blur' }]" prop="passwordComfirm">
    <el-input v-model.trim="user_passwordComfirm" :placeholder="placeholder" clearable type="password" @input="enterInput" />
  </el-form-item>
</template>

<script>
export default {
  name: 'PasswordComfirm',
  props: {
    placeholder: {
      type: String,
      default: '确认密码'
    },
    pwComfirm: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      user_passwordComfirm: ''
    }
  },
  methods: {
    comfirmpassWord(rules, value, callback) {
      if (!this.user_passwordComfirm && this.pwComfirm) {
        return callback(new Error('请再次输入密码'))
      } else if (this.user_passwordComfirm !== this.pwComfirm) {
        return callback(new Error('确认密码与原密码不一致'))
      } else {
        callback()
      }
    },
    enterInput(val) {
      this.$emit('update:value', this.user_passwordComfirm)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
