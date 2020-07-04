<template>
  <div class="toolbar">
    <div class="toolbtn">
      <el-button class="btn" v-for="(item,index) in btns" :key="index" @click="btnClick(item.index)" plain type="primary" size="small" :title="item.label" :icon="item.icon" >{{item.label}}</el-button>
    </div>
    <div class="toolsearch">
      <el-input v-model="keyword" style="width: 80%" size="small" placeholder="请输入名称关键字"></el-input>
      <el-button @click="search" title="搜索" class="bg" size="small"
                 icon="el-icon-search"></el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ToolbarWithSearch",
    props:['btns'],
    data(){
      return{
        keyword:''
      }
    },
    methods:{
      btnClick(index){
        this.$emit("btn-click",index);
      },
      search(){
        var keyword = this.keyword;
        this.$emit("search",keyword)
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

  .toolsearch {
    display: inline-block;
    vertical-align: top;
    float: right;
    padding-right: 20px;
    width: 280px;
  }
</style>
