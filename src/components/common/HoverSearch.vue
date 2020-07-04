<template>
  <div tabindex="0" :class="active" class="search">
    <el-button @click="toggle" type="primary" :icon="icon" circle/>
    <input @keydown="search" class="input" v-model="input" placeholder="按 Enter 键搜索">
  </div>
</template>

<script>
  export default {
    name: "HoverSearch",
    data() {
      return {
        active: 'active1',
        icon: 'el-icon-search',
        input: ''
      }
    },
    methods: {
      toggle: function () {
        if (this.active === 'active') {
          this.active = '';
          this.icon = 'el-icon-search';
        } else {
          this.active = 'active';
          this.icon = 'el-icon-close';
        }
      },
      search:function (key) {
        console.log("搜索内容:",this.input);
        // if (key.keyCode === 13) {
        //   console.log(this.input);
        //   this.$router.push("/data");
        // }
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .search {
    position: fixed;
    z-index: 9999;
    top: 400px;
    right: 0;
    width: 300px;
    height: 60px;
    line-height: 54px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border: 3px solid white;
    box-shadow: 3px 3px #34a4ff;
    padding-left: 5px;
    background-color: #409EFF;
    transition: margin-right 0.4s ease-out, opacity 0.2s ease-in, visibility 0.2s ease-in;
    margin-right: -240px;
    outline: none;
  }

  .active {
    margin-right: 0px;
  }

  .toggle {
    width: 60px;
    height: 60px;
  }

  .el-button {
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  }

  .el-button:hover {
    background-color: transparent;
  }

  .input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 60%;
  }

</style>
