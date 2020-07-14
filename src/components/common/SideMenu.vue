<template>
  <div class="sidebar" :style="{
    'width':this.$store.state.sideMenuCollapse?this.$store.state.sideMenuCollapseWidth+'px':this.$store.state.sideMenuWidth+'px',
    'transition':'width .15s'
  }">
    <div v-if="this.$store.state.sideMenuHeaderHeight>39" class="menuheader" :style="{'height':this.$store.state.sideMenuHeaderHeight+'px','line-height':this.$store.state.sideMenuHeaderHeight+'px'}">
      <img class="logo" :src="logo"/>
      <p class="text" v-if="!this.$store.state.sideMenuCollapse">Administrator</p>
    </div>
    <div class="menu" :style="{'height':(this.$store.state.screenHeight-this.$store.state.bannerHeight-this.$store.state.sideMenuHeaderHeight-this.$store.state.sideMenuFooterHeight)+'px'}">
      <el-menu
        class="sidebar-el-menu"
        :default-active="activeNav"
        :collapse="this.$store.state.sideMenuCollapse"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        unique-opened
        router
      >
        <template v-for="item in items">
          <el-submenu style="color: #3a8ee6;background-color: #42b983;" v-if="item.children&&item.children.length>0" :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children&&subItem.children.length>0" :index="subItem.index"
                          :key="subItem.index">
                <template slot="title">
                  <i :class="subItem.icon"></i>
                  <span slot="title">{{ subItem.title }}</span>
                </template>
                <template v-for="thirdItem in subItem.children">
                  <el-submenu v-if="thirdItem.children&&thirdItem.children.length>0" :index="thirdItem.index"
                              :key="thirdItem.index">
                    <template slot="title">
                      <i :class="thirdItem.icon"></i>
                      <span slot="title">{{ thirdItem.title }}</span>
                    </template>
                    <template v-for="forthItem in thirdItem.children">
                      <el-submenu v-if="forthItem.children&&forthItem.children.length>0"
                                  :index="forthItem.index"
                                  :key="forthItem.index">
                        <template slot="title">
                          <i :class="forthItem.icon"></i>
                          <span slot="title">{{ forthItem.title }}</span>
                        </template>

                      </el-submenu>
                      <el-menu-item v-else :index="forthItem.index" :key="forthItem.index">
                        <i :class="forthItem.icon"></i>
                        <span slot="title">{{ forthItem.title }}</span>
                      </el-menu-item>
                    </template>
                  </el-submenu>
                  <el-menu-item v-else :index="thirdItem.index" :key="thirdItem.index">
                    <i :class="thirdItem.icon"></i>
                    <span slot="title">{{ thirdItem.title }}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                <i :class="subItem.icon"></i>
                <span slot="title">{{ subItem.title }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div v-if="this.$store.state.sideMenuFooterHeight>39" class="menufooter" :style="{'height':this.$store.state.sideMenuFooterHeight+'px','line-height':this.$store.state.sideMenuFooterHeight+'px'}">
      <el-button class="footerbtn" @click="collapseChange" type="text" :icon="this.$store.state.sideMenuCollapse?'el-icon-s-unfold':'el-icon-s-fold'"/>
      <el-button v-if="!this.$store.state.sideMenuCollapse" style="color: #3a8ee6" class="footerbtn" type="text" icon="el-icon-user-solid"/>
      <el-button v-if="!this.$store.state.sideMenuCollapse" style="color: #5ce8a4" class="footerbtn" type="text" icon="el-icon-s-comment"/>
      <el-button v-if="!this.$store.state.sideMenuCollapse" style="color: #44c7ff" class="footerbtn" type="text" icon="el-icon-s-tools"/>
      <el-button v-if="!this.$store.state.sideMenuCollapse" style="color: #fffa8a" class="footerbtn" type="text" icon="el-icon-warning-outline"/>
    </div>
  </div>

</template>

<script>

  export default {
    name: 'SideMenu',
    props:['items'],
    data() {
      return {
        activeNav:'/admin/dashboard',
        logo:require('../../assets/logo.png')
      }
    },
    watch: {
      $route (newRoute, oldRoute) {
        console.log("监听路由变化:",newRoute.fullPath);
        this.activeNav = newRoute.fullPath;
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    methods:{
      // 侧边栏折叠
      collapseChange() {
        this.$store.commit('toggleSideMenuCollapse');
      }
    }
  };
</script>

<style scoped>
  .sidebar {
    /*width: 250px;*/
    /*display: block;*/
    position: absolute;
    user-select: none;
    /*height: 0;*/
    /*left: 0;*/
    /*top: 180px;*/
    /*bottom: 0;*/
    /*overflow-y: scroll;*/
  }

  .el-menu{
    border: none;
  }

  .menu{
    width: 100%;
    /*height: calc(100% - 230px);*/
    overflow-y: auto;
    background-color: #324257;
  }
  .menuheader{
    width: 100%;
    /*height: 40px;*/
    line-height: 40px;
    background-color: #303133;
    color: #fff;
  }
  .text{
    margin-left: 5px;
    font-size: 20px;
    display: inline-block;
    vertical-align: middle;
    letter-spacing: 2px;
  }
  .logo{
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    /*height: 25px;*/
    margin-left: 13px;
  }
  .menufooter{
    width: 100%;
    /*height: 40px;*/
    line-height: 40px;
    background-color: #303133;
  }
  .footerbtn{
    color: #fff;
    font-size: 20px;
    margin-left: 20px;
  }
</style>
