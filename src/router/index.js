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
      redirect: '/admin/dashboard'
    },
    {
      path: '/redirect',
      hidden: true,
      component: () => import('@/components/pages/Admin.vue'),
      children: [
        {
          path: '/redirect/:path*', // path为默认名称 通配符*必须存在 反之404
          component: () => import('@/components/common/Redirect.vue')
        }
      ]
    },
    {
      path: '/admin',
      redirect: '/admin/dashboard',
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
        },
        {
          path: '403',
          component: () => import('../components/pages/403.vue'),
          meta: {title: '403页面', icon: 'el-icon-s-tools'}
        }
      ]
    }
  ]
})
