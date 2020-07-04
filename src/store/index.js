import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    //这里放全局参数
    screenHeight: document.documentElement.clientHeight || document.body.clientHeight, // 屏幕可用高度
    bannerHeight:72, // 头部banner高度
    sideMenuCollapse:false, // 侧边栏默认是否收缩
    sideMenuWidth:250, // 侧边栏宽度
    sideMenuCollapseWidth:65 // 侧边栏收缩后宽度
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
