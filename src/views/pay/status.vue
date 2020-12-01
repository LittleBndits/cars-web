<template>
  <div class="user-container">
    <Back />
    <div class="text-c color-white lh-40">
      <h4><strong>订单号</strong></h4>
      <p>{{ order_no }}</p>
    </div>
    <div class="blank-40" />
    <div>
      <el-button type="warning" round class="button-block" @click="topay"><strong>去支付</strong></el-button>
    </div>
    <div class="blank-20" />
    <div>
      <el-button type="primary" round class="button-block" @click="overpay"><strong>完成支付</strong></el-button>
    </div>
  </div>
</template>
<script>
import { GETORDERSTATUS } from '@/api/order'
import { setInterval } from 'timers'
export default {
  name: 'PayStatus',
  components: {},
  data() {
    return {
      order_no: localStorage.getItem('order_no'),
      timer: null
    }
  },
  created() {
    // this.getorderstatus()
    // this.setTimer()
  },
  methods: {
    orderStatus() {
      return GETORDERSTATUS({
        order_no: localStorage.getItem('order_no')
      })
        .then((result) => {
          return result.data.status
        })
        .catch(() => {})
    },
    async getorderstatus() {
      const status = await this.orderStatus()
      this.toresult(status)
    },
    async topay() {
      const status = await this.orderStatus()
      this.toresult(status)
    },
    async overpay() {
      const status = await this.orderStatus()
      this.toresult(status)
    },
    setTimer() {
      this.timer = setInterval(() => {
        this.getorderstatus()
      }, 3000)
    },
    toresult(status) {
      if (status === 'success') {
        clearInterval(this.timer)
        this.$router.replace({
          path: '/payResult',
          query: {
            status
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
</style>
