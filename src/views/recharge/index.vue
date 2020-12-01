<template>
  <div class="user-container">
    <Back />
    <div class="amount-list">
      <div v-for="item in amountList" :key="item.id" class="item">
        <div class="a-wrap" :class="{'current':defaultcheck==item.id}" @click="checkamount(item)">{{ item.amount }}</div>
      </div>
    </div>
    <div class="cars-form-ui">
      <el-form ref="form">
        <el-form-item>
          <el-input v-model.number="amount_num" placeholder="请输入充值金额" @input="inputeven" />
        </el-form-item>
      </el-form>
    </div>
    <div class="blank-100" />
    <section class="section-mode">
      <header>
        <h4 class="title">支付类型</h4>
      </header>
      <div class="content">
        <ul class="links">
          <li class="">
            <span class="pull-left">微信</span>
            <i class="icon check-round current" />
          </li>
          <li>
            <span class="pull-left">支信宝</span>
            <i class="icon check-round" />
          </li>
        </ul>
      </div>
    </section>
    <div class="blank-100" />
    <el-button :disabled="disabled_btn" type="primary" class="button-block" round @click="confirmPay">确认充值</el-button>
  </div>
</template>
<script>
import { GETAMOUNTLIST, PAY } from '@/api/pay'
export default {
  name: 'User',
  components: {},
  data() {
    return {
      img: require('@/assets/images/level-img.png'),
      amountList: '',
      defaultcheck: '',
      checkAmount: '',
      amount_num: '',
      disabled_btn: true,
      paytype: this.$route.query.type
    }
  },
  beforeMount() {
    this.getamountlist()
  },
  methods: {
    getamountlist() {
      GETAMOUNTLIST()
        .then((result) => {
          const resdata = result.data
          this.amountList = resdata
        })
        .catch(() => {})
    },
    /* 选择金额 */
    checkamount(item) {
      this.defaultcheck = item.id
      this.checkAmount = item
      this.disabled_btn = false
    },
    /* 充值 */
    confirmPay() {
      let amount = this.amount_num || this.checkAmount.amount
      if (this.amount_num && this.checkAmount.amount) {
        amount = this.checkAmount.amount
      }
      const params = {
        type: this.paytype,
        amount: amount * 1
      }
      PAY(params)
        .then((result) => {
          const order_no = result.data.order_no
          localStorage.setItem('order_no', order_no)
          this.$router.push('/payStatus')
        })
        .catch(() => {})
    },
    /* 输入金额 */
    inputeven() {
      const reg = /^[0-9]*$/
      const status = reg.test(this.amount_num)
      this.disabled_btn = !status || this.amount_num === ''
      if (!status) {
        this.$message('金额只能输入数字')
        return
      }
      console.log(
        '🚀 ~ file: index.vue ~ line 89 ~ inputeven ~   reg(this.amount_num)',
        reg.test(this.amount_num)
      )
    }
  }
}
</script>
<style lang="scss">
.section-mode {
  padding-bottom: 30px;
  margin-bottom: 30px;
  header {
    margin-bottom: 20px;
  }
  .title {
    font-size: 14px;
    color: #fff;
    opacity: 0.5;
  }
}
.price {
  color: #fff;
  span {
    font-size: 40px;
    font-family: 'bahnschrift';
  }
  em {
    font-size: 18px;
  }
}
.goto {
  display: inline-block;
  height: 36px;
  padding: 0 20px;
  font-size: 18px;
  line-height: 36px;
  border: 2px solid #00a3ff;
  border-radius: 100px;
  color: #00a3ff;
}
.links {
  li {
    display: block;
    height: 20px;
    line-height: 20px;
    position: relative;
    padding: 11px 0;
    color: #fff;
    font-size: 16px;
  }
}
.amount-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  .item {
    padding: 0 10px;
    margin-bottom: 20px;
    flex: 1;
    @include webkit(box-sizing, border-box);
    width: 33.33333%;
    min-width: 33.33333%;
    max-width: 33.33333%;
  }
  .a-wrap {
    height: 48px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    color: #fff;
    font-family: 'bahnschrift';
    line-height: 48px;
    font-size: 24px;
    &.current {
      background-color: #00a3ff;
      border: 1px solid #00a3ff;
    }
  }
}
.check-round {
  position: relative;
  float: right;
  width: 18px;
  height: 18px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    left: 3px;
    top: 6px;
    width: 10px;
    height: 4px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    @include webkit(transform, rotate(-45deg));
  }
  &.current {
    border: 1px solid #00a3ff;
    background-color: #00a3ff;
    &::before {
      content: '';
      border-left: 1px solid #fff;
      border-bottom: 1px solid #fff;
    }
  }
}
</style>
