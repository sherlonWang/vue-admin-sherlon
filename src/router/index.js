import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};



export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/admin'
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/components/pages/Admin.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../components/pages/Dashboard.vue'),
          meta: {title: '系统首页', icon: 'el-icon-s-tools'}
        },
        {
          path: '404',
          component: () => import('../components/pages/404.vue'),
          meta: {title: '404页面', icon: 'el-icon-s-tools'}
        }
      ]
    }
  ]
})
