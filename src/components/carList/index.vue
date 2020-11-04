<template>
  <div class="carList">
    <section class="car-item">
      <header>
        <h4 class="car-logo">
          <img src="../../assets/images/cars-logo.png" height="34" alt="" />
          <span>Mustang 2019款</span>
        </h4>
        <p class="attr">新能源汽车 5座</p>
      </header>
      <div class="car-content">
        <div class="inof">
          <div>
            <div class="car-number">粤 B9087N</div>
            <div class="car-Power">
              <ul class="active-li-6">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div class="car-km">
                <span>約</span>
                <strong>600</strong>
                <span>Km</span>
              </div>
            </div>
          </div>
        </div>
        <img src="../../assets/images/pic001.jpg" height="120" alt="" />
      </div>
      <footer>
        <a href="javascript:void(0);" class="parking-link">某某停車場</a>
      </footer>
    </section>
    <!-- 汽车详情 -->
    <section class="car-item car-item-details" :style="'height:' + height">
      <div class="scroll">
        <h4 class="column">
          某某停车场
          <i class="close"></i>
        </h4>
        <header>
          <h4 class="car-logo">
            <img src="../../assets/images/cars-logo.png" height="34" alt="" />
            <span>Mustang 2019款</span>
          </h4>
          <p class="attr">新能源汽车 5座</p>
        </header>
        <img src="../../assets/images/pic001.jpg" alt="" width="100%" />
        <div class="clearfix">
          <div class="pull-left font24">粤 B9087N</div>
          <div class="car-km pull-right">
            <span>約</span>
            <strong>600</strong>
            <span>Km</span>
          </div>
        </div>
        <div class="car-electric-box">
          <div class="p-r">
            <span class="e-high" style="width:80%"></span>
            <span class="e-bg"></span>
          </div>
        </div>
        <div class="info color-main text-c">
          取车约支付12.0元停车费，实际补贴12.0元
        </div>
        <ul class="car-type-list">
          <li class="current">
            <span class="type-name">日租车</span>
            <span class="type-price">
              300.0元/1天
            </span>
          </li>
          <li>
            <span class="type-name">日租车</span>
            <span class="type-price">
              300.0元/天
            </span>
          </li>
          <li>
            <span class="type-name">日租车</span>
            <span class="type-price">
              300.0元/天
            </span>
          </li>
          <li>
            <span class="type-name">日租车</span>
            <span class="type-price">
              300.0元/天
            </span>
          </li>
        </ul>
        <div class="clause-dec clearfix">
          <span class="pull-left">参保《全面保障服务》用车更放心</span>
          <i class="pull-right current"></i>
        </div>
        <i class="icon iconBtn text-c">
          预约用车
        </i>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CarList',
  props: {
    height: {
      type: String,
      default: '257px'
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
