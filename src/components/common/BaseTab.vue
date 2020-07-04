<template>
  <div>
    <div class="tabs">
      <el-tabs
        v-model="activeTab"
        @tab-remove="tabRemove"
        @tab-click="tabClick"
        @contextmenu.prevent.native="openContextMenu($event)"
      >
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          :closable="item.closable"
        >
          {{item.content}}
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="operate">
      <el-dropdown @command="commandTabs">
        <el-button size="small" type="primary">
          操作<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="current">关闭当前</el-dropdown-item>
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <ul
      v-show="contextMenuVisible"
      :style="{left:left+'px',top:top+'px'}"
      class="contextmenu"
    >
      <li @click="closeCurrentTab('menu')">关闭当前</li>
      <li @click="closeOtherTabs('menu')">关闭其他</li>
      <li @click="closeAllTabs('menu')">关闭所有</li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: "BaseTab",
    data() {
      return {
        contextMenuVisible:false,
        left:0,
        top:0,
        contextActiveTab: '',
        dashboardTitle: '系统首页',
        dashboardPath: '/admin/dashboard',
        activeTab: '/admin/dashboard',
        closable:true,
        tabList:[],
      }
    },
    watch: {
      $route(newValue, oldValue) {
        this.tabAdd(newValue);
      },
      contextMenuVisible(value) {
        if (this.contextMenuVisible) {
          document.body.addEventListener("click", this.closeContextMenu);
        } else {
          document.body.removeEventListener("click", this.closeContextMenu);
        }
      }
    },
    created() {
      const that = this;
      that.tabList.push({
        title: that.dashboardTitle,
        path: that.dashboardPath,
        name: that.dashboardPath,
        closable:false
      });
      that.$router.push(that.dashboardPath);
    },
    methods: {
      // 设置标签
      tabAdd(route) {
        const that = this;
        const filterTab = this.tabList.filter(item => {
          return item.path === route.fullPath;
        });
        if (filterTab.length === 0) {
          that.tabList.push({
            title: route.meta.title,
            path: route.fullPath,
            name: route.fullPath,
            closable:route.fullPath !== that.dashboardPath
          });
          // 添加的tab页默认为激活状态
          that.activeTab = that.tabList[that.tabList.length-1].name;
        }else {
          // 如果tab页存在，激活该tab页
          that.activeTab = filterTab[0].name;
        }
      },
      tabClick(tab){
        const that = this;
        console.log("tabClick:",tab);
        // 单机tab需要切换路由
        that.$router.push(tab.name);
      },
      tabRemove(targetName) {
        const that = this;
        console.log("remove tab:",targetName);
        let tabs = that.tabList;
        let activeName = that.activeTab;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        that.activeTab = activeName;
        that.tabList = tabs.filter(tab => tab.name !== targetName || tab.name === that.dashboardPath);
        // 删除tab后需要重新切换路由
        that.$router.push(activeName);
      },
      closeCurrentTab(op){
        const currentTab = op === 'btn'?this.activeTab:this.contextActiveTab;
        if (this.tabList.length > 1) {
          this.tabRemove(currentTab);
        }
      },
      closeOtherTabs(op){
        const currentTab = op === 'btn'?this.activeTab:this.contextActiveTab;
        this.tabList = this.tabList.filter(tab => tab.name === currentTab || tab.name === this.dashboardPath);
        this.activeTab = currentTab;
        this.$router.push(currentTab);
      },
      closeAllTabs(op){
        this.tabList = this.tabList.filter(tab => tab.name === this.dashboardPath);
        this.$router.push(this.dashboardPath);
      },
      commandTabs(command){
        const that = this;
        switch (command) {
          case "current":
            that.closeCurrentTab("btn");
            break;
          case "other":
            that.closeOtherTabs("btn");
            // that.tabList = that.tabList.filter(tab => tab.name === that.activeTab || tab.name === that.dashboardPath);
            break;
          case "all":
            that.closeAllTabs("btn");
            break;
          default:
            break;
        }
      },
      openContextMenu(e){
        console.log("打开菜单栏");
        console.log(e.srcElement.id);
        if (e.srcElement.id) {
          // 赋值右键菜单时激活的tab
          this.contextActiveTab = e.srcElement.id.split("-")[1];
          this.left = e.clientX-(this.$store.state.sideMenuCollapse?this.$store.state.sideMenuCollapseWidth:this.$store.state.sideMenuWidth);
          this.top = e.clientY-this.$store.state.bannerHeight + 10;
          this.contextMenuVisible = true;
        }
      },
      closeContextMenu(){
        this.contextMenuVisible = false;
      }
    }
  }
</script>

<style scoped>
  .tabs {
    width: calc(100% - 100px);
    height: 35px;
    display: inline-block;
    vertical-align: center;
    border: 2px solid #ffffff;
    user-select: none;
  }

  .operate {
    color: #fff;
    width: 80px;
    height: 32px;
    display: inline-block;
    float: right;
    margin: 4px 4px;
    border-radius: 4px;
  }
  .el-dropdown {
    color: #fff;
  }
  .contextmenu {
    width: 90px;
    margin: 0;
    /*border: 1px solid #ccc;*/
    background-color: #fff;
    z-index: 9999;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 14px;
    color: #606266;
    box-shadow: 2px 2px 3px 0 rgba(115, 115, 115, 0.2);
  }
  .contextmenu li {
    margin: 0;
    padding: 5px 15px;
  }
  .contextmenu li:hover {
    background: #ecf5ff;
    cursor: pointer;
    color: #66b1ff;
  }
</style>
