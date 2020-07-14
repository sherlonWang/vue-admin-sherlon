<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
  import Banner from "./components/common/Banner";
  export default {
    name: 'App',
    provide(){
      return {
        reload: this.reload
      }
    },
    data(){
      return {
        isRouterAlive: true
      }
    },
    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  body{
    min-width: 1300px;
    background: #f5f5f5;
  }
  .el-input-group__prepend{
    width: 120px;
  }
  .el-input.is-disabled .el-input__inner{
    background-color: rgba(255,255,255,.5);
  }
  .el-table thead{
    color: #606266;
    font-size: 15px;
  }
  .el-button+.el-button {
     margin-left: 0px;
  }
  .detailimg {
    display: inline-block;
    vertical-align: top;
    width: 350px;
    height: 350px;
    background-color: #f0f1f4;
    text-align: center;
    margin: 20px 10px;
    padding-top: 10px;
    /*border: 1px solid red;*/
    border-radius: 10px;
  }

  .detailimg img {
    width: 280px;
    height: 260px;
    margin-top: 20px;
  }
  .el-tabs__item {
    border: 1px solid #dedfe2;
    border-radius: 4px;
    padding: 0 10px;
    height: 32px;
    margin-top: 2px;
    margin-left: 3px;
    margin-bottom: 6px;
    font-size: 12px;
    line-height: 32px;
  }
  .el-tabs__active-bar{
    background-color: transparent;
  }
  .el-tabs__item.is-active {
    color: #fff;
    background-color: #409EFF;
  }
  .el-tabs__nav-next, .el-tabs__nav-prev {
    position: absolute;
    cursor: pointer;
    line-height: 35px;
    font-size: 12px;
    /*color: #f5f7fa;*/
    /*background-color: #409EFF;*/
    color: #000;
    background-color: #fff;
  }
  .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 10px;
  }
  .tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 10px;
  }
  .el-tabs__nav-wrap::after {
    height: 0px;
  }
  .el-tabs__nav-scroll {
    border: 1px solid #d1d1d1;
    height: 35px;
    background-color: #fff;
  }
</style>
