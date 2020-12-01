<template>
  <div>
    <el-form-item :rules="rules" prop="code">
      <el-button :loading="laoding" type="button" class="btn-vcode" :disabled="disabled" @click="handerCode">{{ buttonTxt }}</el-button>
      <el-input v-model="code" placeholder="验证码" @input="codeValue" />
    </el-form-item>
  </div>
</template>

<script>
/* Api */
import { GetCode } from '@/api/account'
/* 检验 */
import { validate_phone } from '@/utils/validate'
export default {
  name: 'Code',
  props: {
    isPhone: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      /* 按钮状态 */
      disabled: true,
      laoding: false,
      /* 验证码 */
      code: '',
      /* 按钮文本 */
      buttonTxt: '获取验证码',
      /* 定时器 */
      thimer: null,
      rules: [
        { required: true, message: '验证码不能为空', trigger: 'blur' },
        { min: 6, max: 6, message: '请输入6位字符验证码', trigger: 'blur' }
      ]
    }
  },
  watch: {
    isPhone: {
      handler(val) {
        this.disabled = !validate_phone(val)
      }
    }
  },
  methods: {
    /* 获取验证码 */
    handerCode() {
      this.laoding = true
      const params = {
        username: this.isPhone,
        module: 'register'
      }
      GetCode(params)
        .then((result) => {
          if (result.resCode === 0) {
            this.$message.success(result.message)
            this.laoding = false
            /* 倒计时 */
            this.countdown()
          }
        })
        .catch(() => {
          this.laoding = false
        })
    },
    /* 倒计时 */
    countdown() {
      let second = 60
      /* 重新初始化按钮文本 */
      this.buttonTxt = `剩余 ${second} S`
      /* 激活按钮可以点击 */
      this.disabled = true
      this.thimer = setInterval(() => {
        second--
        /* 重新初始化按钮文本 */
        this.buttonTxt = `剩余 ${second} S`
        if (second === 0) {
          /* 当秒等于0时，清除定时器 */
          clearInterval(this.thimer)
          /* 重新初始化按钮文本 */
          this.buttonTxt = '重新获取'
          /* 激活按钮可以点击 */
          this.disabled = false
        }
      }, 1000)
    },
    codeValue(val) {
      this.$emit('update:codeValue', val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
