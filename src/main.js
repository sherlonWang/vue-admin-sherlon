// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = true;

import api from './api/index'
Vue.prototype.$api = api;

import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.config.productionTip && require("./api/mock");

// 引入第三方vue组件库element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI,{
  size:"medium"
});

import HighchartsVue from 'highcharts-vue'
import fa from "element-ui/src/locale/lang/fa";
Vue.use(HighchartsVue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
