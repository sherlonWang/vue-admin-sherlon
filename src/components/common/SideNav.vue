<template>
  <div class="sidenav">
    <el-card class="box-card">
      <div slot="header" class="header">
          <h2><i :class="nav.icon"></i> {{nav.title}}</h2>
      </div>
      <div v-for="(o,index) in nav.children" :key="index" class="body">
        <div @click="itemClick(o.index)" class="navitem">
          <img class="icon" :src="require(`../../assets/img/${o.img}`)">
          <p :class="selected === o.index?'text textactive':'text'">{{o.title}}</p>
        </div>
        <div v-show="selected === o.index" class="active">
          <img src="../../assets/img/active.png">
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "SideNav",
    props:["nav"],
    data() {
      return {
        selected:'1'
      }
    },
    methods:{
      itemClick(index){
        // alert(index);
        this.selected = index;
        this.$emit('item-click', index);
      }
    }
  }
</script>

<style scoped>
  .sidenav {
    width: 300px;
  }
  .navitem{
    display: inline-block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    /*line-height: 40px;*/
    cursor: pointer;
    border: 1px solid #f0f0f0;
  }
  .text:hover{
    color: #1196db;
  }
  .icon{
    vertical-align: top;
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 6px 5px;
  }
  .text{
    vertical-align: top;
    height: 40px;
    color: #333333;
    display: inline-block;
    font-size: 16px;
    margin-left: 10px;
  }
  .textactive{
    color: #1196db;
  }
  .active{
    display: inline-block;
    vertical-align: top;
  }
  .active img{
    width: 30px;
    height: 30px;
    padding-top: 8px;
  }

</style>
