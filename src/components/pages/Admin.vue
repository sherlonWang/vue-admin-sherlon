<template>
  <div>
    <!-- 头部Header -->
    <Header/>
    <el-container class="admin" :style="{
    'height':(this.$store.state.screenHeight-this.$store.state.bannerHeight)+'px'
  }">
      <el-aside
        :width="this.$store.state.sideMenuCollapse?this.$store.state.sideMenuCollapseWidth+'px':this.$store.state.sideMenuWidth + 'px'">
        <side-menu :items="items"/>
      </el-aside>
      <el-main class="centerShowRegion">
        <div class="tab">
          <base-tab/>
        </div>
        <div class="content">
          <transition name="move" mode="out-in">
            <router-view/>
          </transition>
          <el-backtop target=".centerShowRegion"/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import SideMenu from "../common/SideMenu";
  import BaseTab from "../common/BaseTab";
  import Banner from "../common/Banner";
  import Header from "../common/Header";

  export default {
    name: "Admin",
    components: {Header, Banner, BaseTab, SideMenu},
    data() {
      return {
        items: [
          {
            icon: 'el-icon-s-home',
            index: '/admin/dashboard',
            title: '系统首页'
          },
          {
            icon: 'el-icon-s-home',
            index: '/admin/404',
            title: '404页面'
          },
          {
            icon: 'el-icon-s-home',
            index: '/admin/403',
            title: '403页面'
          },
          {
            icon: 'el-icon-s-home',
            index: '/admin/goods',
            title: '商品管理'
          }
        ]
      }
    },
    created() {
      this.$router.push("/admin/dashboard");
    }
  };
</script>

<style scoped>
  .admin {
    width: 100%;
    height: 100%;
    /*background-color: #42b983;*/
  }

  .centerShowRegion {
    /*overflow: hidden;*/
    left: 65px;
  }

  .tab {
    position: sticky;
    position: -webkit-sticky;
    top: 0px;
    z-index: 999;
  }

  .content {
    /*overflow: auto;*/
    z-index: -1;
  }

  .el-main {
    padding: 0;
  }
</style>
