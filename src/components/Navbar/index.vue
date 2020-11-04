<template>
  <div class="nav-main">
    <ul>
      <li>
        <i class="icon icon-w-44 icon-help"></i>
      </li>
      <li>
        <i class="icon icon-w-44 icon-search"></i>
      </li>
      <li>
        <i class="icon icon-w-44 iconBtn">选择车辆</i>
      </li>
      <li>
        <i class="icon icon-w-44 icon-location"></i>
      </li>
      <li>
        <i class="icon icon-w-44 icon-user" @click="toUser"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      
    }
  },
  methods: {
    toUser(){
      this.$router.push({
        name:'User'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.nav-main {
  position: fixed;
  bottom: 60px;
  left: 0;
  text-align: center;
  width: 100%;
  z-index: 10;
  ul {
    width: 540px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: auto;
  }
 
}
</style>
