import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    //这里放全局参数
    screenHeight: document.documentElement.clientHeight || document.body.clientHeight, // 屏幕可用高度
    bannerHeight:64, // 头部banner高度 为了美观，值不小于50，如果不需要，高度设置为0即可
    sideMenuCollapse:false, // 侧边栏默认是否收缩
    sideMenuWidth:250, // 侧边栏宽度
    sideMenuCollapseWidth:65, // 侧边栏收缩后宽度
    sideMenuHeaderHeight:40, // 侧边栏头部高度  如果不需要，设置为0；如果需要，值不小于40
    sideMenuFooterHeight:40 // 侧边栏底部工具条高度  如果不需要，设置为0；如果需要，值不小于40
  },
  getters: {
    //get方法
  },
  mutations: {
    //这里是set方法
    toggleSideMenuCollapse(state,value){
      state.sideMenuCollapse = !state.sideMenuCollapse;
    }
  },
  actions: {
  }
});
export default store;
