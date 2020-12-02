<template>
  <div class="user-container">
    <Back column="安全设置" />
    <ul class="menu">
      <li class="current">全部</li>
      <li>待取车</li>
      <li>待支付</li>
      <li>已取消</li>
      <li>已完成</li>
    </ul>
    <div class="order-list" :style="{height:listHeight}">
      <template v-for="(item,index) in orderlist">
        <div :key="item.id+index" class="item" @click="detailed">
          <div class="info">
            <time class="flex-1">{{ item.create_date }}</time>
            <div class="flex-1">
              <span class="status" :class="'color-' + (item.order_status?item.order_status:'') ">{{ orderStatus[item.order_status]?orderStatus[item.order_status].zh:'' }}</span>
            </div>
          </div>
          <p class="number">{{ item.carsNumber }}</p>
          <div>
            <div class="price pr arrow">
              <em>￥</em>
              <span>2000.00</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { GETORDERLIST } from '@/api/order'
export default {
  name: 'User',
  components: {},
  data() {
    return {
      fullHeight:
        document.documentElement.clientHeight || document.body.clientHeight,
      img: require('@/assets/images/level-img.png'),
      orderlist: [],
      orderStatus: this.$store.state.config.order_status
    }
  },
  computed: {
    listHeight: function() {
      return this.fullHeight - 238 + 'px'
    }
  },
  watch: {
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.fullHeight =
          document.documentElement.clientHeight || document.body.clientHeight
        that.fullHeight = window.fullHeight
      })()
    }
  },
  beforeMount() {
    this.getorderlist()
  },
  methods: {
    detailed() {
      this.$router.push({
        name: 'OrderDetailed'
      })
    },
    /* 租车订单列表 */
    getorderlist() {
      GETORDERLIST({
        pageNumber: 1,
        pageSize: 99999999
      }).then((result) => {
        if (result.data && result.data.data) {
          const resdata = result.data.data
          this.orderlist = resdata
        }
      })
    }
  }
}
</script>
<style lang="scss">
.menu {
  text-align: center;
  margin-bottom: 40px;
  li {
    display: inline-block;
    position: relative;
    font-size: 14px;
    opacity: 0.5;
    padding: 0 12px 15px;
    color: #fff;
    cursor: pointer;
    &.current {
      opacity: 1;
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -15px;
        width: 30px;
        height: 4px;
        border-radius: 10px;
        background-color: #00a3ff;
      }
    }
  }
}
.order-list {
  overflow-y: auto;
  .item {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 0 18px 20px;
    color: #fff;
    margin-bottom: 20px;
  }
  .info {
    display: flex;
    padding: 22px 0;
    time {
      font-family: 'bahnschrift';
    }
    .status {
      float: right;
    }
  }
  .number {
    font-size: 18px;
    padding: 0 0 20px;
    margin-bottom: 20px;
    font-family: 'bahnschrift';
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
}
.price {
  position: relative;
  color: #fff;
  span {
    font-size: 36px;
    font-family: 'bahnschrift';
  }
  em {
    font-size: 18px;
  }
}
.arrow:after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 10px;
  height: 10px;
  margin-top: -6px;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  @include webkit(box-sizing, border-box);
  @include webkit(transform, rotate(45deg));
  opacity: 0.1;
}
</style>
