<template>
  <div class="back-con">
    <div class="back">
      <span class="icon-back" @click="backFn"></span>
      <span class="titel">{{titlename}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"Back",
  props:{
    titlename:{
      type:String,
      default:''
    }
  },
  methods:{
    backFn(){
      this.$router.back(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.back-con {
  padding-top: 147px;
  position: relative;
}
.back {
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: 21px;
  left: 0;
  // margin-top: 21px;
  // background-color: #fff;
  .titel {
    display: inline;
    font-size: 16px;
  }
  .icon-back {
    width: 40px;
    height: 40px;
    float: left;
    &:after {
      cursor: pointer;
      content: "";
      width: 12px;
      height: 12px;
      border-top: 1px solid $color-blue;
      border-left: 1px solid $color-blue;
      @include webkit(box-sizing, border-box);
      @include webkit(transform, rotate(-45deg));
      display: inline-block;
    }
  }
}
</style>
