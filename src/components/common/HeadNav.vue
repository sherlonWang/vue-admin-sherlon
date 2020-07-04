<template>
  <div>
    <div id="nav">
      <div v-for="(item,index) in items" :key="index" class="item" @click="navChange(item.route)">
        <img class="img" :src="activeNav === item.route?item.activeImg:item.img">
        <p class="title">{{item.title}}</p>
      </div>
    </div>
    <router-view/>
  </div>

</template>

<script>
  export default {
    name: "HeadNav",
    data() {
      return {
        activeNav: '/home',
        items: [
          {
            img: require("../../assets/img/首页 未激活.png"),
            activeImg: require("../../assets/img/首页 激活.png"),
            title: "首页",
            route: "/home"
          },
          {
            img: require("../../assets/img/潜水器信息 未激活.png"),
            activeImg: require("../../assets/img/潜水器信息 激活.png"),
            title: "潜水器信息",
            route: "/rovinfo"
          },
          {
            img: require("../../assets/img/课题及单位 未激活.png"),
            activeImg: require("../../assets/img/课题及单位 激活.png"),
            title: "课题及单位",
            route: "/projectunit"
          },
          {
            img: require("../../assets/img/潜水器谱系 未激活.png"),
            activeImg: require("../../assets/img/潜水器谱系 激活.png"),
            title: "潜水器谱系",
            route: "/rovpedigree"
          },
          {
            img: require("../../assets/img/技术谱系 未激活.png"),
            activeImg: require("../../assets/img/技术谱系 激活.png"),
            title: "技术谱系",
            route: "/techpedigree"
          },
          {
            img: require("../../assets/img/标准谱系 未激活.png"),
            activeImg: require("../../assets/img/标准谱系 激活.png"),
            title: "标准谱系",
            route: "/standardpedigree"
          },
          {
            img: require("../../assets/img/设备管理 未激活.png"),
            activeImg: require("../../assets/img/设备管理 激活.png"),
            title: "设备管理",
            route: "/devicemgr"
          }
        ]
      }
    },
    watch: {
      $route: {
        handler(curRoute, oldRoute) {
          console.log("监听路由变化:", curRoute);
          this.activeNav = curRoute.fullPath;
        },
        immediate: true
      },

    },
    mounted() {
      // this.$router.push('/main');
    },
    methods: {
      navChange(route) {
        this.activeNav = route;
        var lastPath = this.$router.history.current.path;
        console.log(lastPath);
        if (lastPath === route) {
          return;
        }
        this.$router.push(route);
      }
    }
  }
</script>

<style scoped>
  #nav {
    height: 100px;
    text-align: center;
    /*display: inline-block;*/
    border-bottom: 1px solid #cbcbcb;
    background-color: white;
  }

  .item {
    display: inline-block;
    width: 150px;
    height: 100%;
    margin: 0 15px;
    /*line-height: 10px;*/
    /*margin: auto;*/
    cursor: pointer;
    /*background-color: #00ad9d;*/
    /*position: relative;*/
  }

  .img {
    /*display: inline-block;*/
    width: 60px;
    height: 64px;
  }

  .title {
    /*display: inline-block;*/
    color: #333333;
  }

</style>
