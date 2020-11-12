<template>
  <div>
    <button type="button" class="btn-vcode" :disabled="disabled" @click="handerCode">{{ buttonTxt }}</button>
    <el-input v-model="code" placeholder="验证码" />
  </div>
</template>

<script>
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
      /* 验证码 */
      code: '',
      /* 按钮文本 */
      buttonTxt: '获取验证码',
      /* 定时器 */
      thimer: null
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
      /* 倒计时 */
      this.countdown()
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
