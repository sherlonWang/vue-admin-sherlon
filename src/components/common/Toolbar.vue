<template>
  <div class="toolbar">
    <div class="toolbtn">
      <el-button class="btn" v-for="(item,index) in btns" :key="index" @click="btnClick(item.index)" plain type="primary" size="small" :title="item.label" :icon="item.icon" >{{item.label}}</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Toolbar",
    props:['btns'],
    methods:{
      btnClick(index){
        this.$emit("btn-click",index);
      }
    }
  }
</script>

<style scoped>
  toolbar {
    /*padding: 10px;*/
    width: 100%;
    height: 50px;
    line-height: 45px;
    position: relative;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
  }

  .toolbtn {
    display: inline-block;
    width: 400px;
    padding-left: 20px;
  }
  .btn{
    margin-left: 5px;
  }
</style>
