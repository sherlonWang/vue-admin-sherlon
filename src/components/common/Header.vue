<template>
  <div v-if="this.$store.state.bannerHeight>49" class="header" :style="{
    'height':this.$store.state.bannerHeight+'px',
    'line-height':this.$store.state.bannerHeight+'px'
  }">
    <div class="logo">
      <img class="img" src="../../assets/logo.png" />
      <p class="text">
        Vue后台管理系统
      </p>
    </div>
    <div class="bar">
      <el-row>
        <el-button title="搜索" type="primary" icon="el-icon-search" circle size="mini"/>
        <el-button title="全屏" icon="el-icon-full-screen" circle size="mini"/>
        <el-button title="文档" type="success" icon="el-icon-reading" circle size="mini"/>
        <el-button title="关于" type="info" icon="el-icon-user-solid" circle size="mini"/>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>
  .header{
    line-height: 64px;
    background-color: #393E49;
    /*border-bottom: 1px solid #d1d1d1;*/
    color: #fff;
  }
  .logo{
    margin-left: 30px;
    width: 40%;
    display: inline-block;
    vertical-align: middle;
  }
  .img{
    width: 35px;
    display: inline-block;
    vertical-align: middle;
  }
  .text{
    font-size: 23px;
    margin-left: 10px;
    display: inline-block;
    vertical-align: middle;
  }

  .bar{
    text-align: right;
    margin-right: 30px;
    float: right;
    display: inline-block;
    vertical-align: middle;
    width: 40%;
    height: 100%;
  }
  .bar button{
    margin-left: 20px;
  }
</style>
