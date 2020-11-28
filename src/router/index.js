import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index/index'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Index',
    path: '/',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      // 账号
      /* 登录 */
      {
        name: 'Login',
        path: '/login',
        meta: {
          title: '登录'
        },
        component: () => import('../views/account/login')
      },
      /* 注册 */
      {
        name: 'Register',
        path: '/register',
        meta: {
          title: '注册'
        },
        component: () => import('../views/account/register')
      },
      /* 忘记密码 */
      {
        name: 'Forget',
        path: '/forget',
        meta: {
          title: '忘记密码'
        },
        component: () => import('../views/account/forget')
      },
      /* 会员中心 */
      {
        name: 'User',
        path: '/user',
        meta: {
          title: '会员中心'
        },
        component: () => import('../views/user/index')
      },
      // 安全设置-首页
      {
        name: 'Safe',
        path: '/safe',
        meta: {
          title: '安全设置'
        },
        component: () => import('../views/safe/index.vue')
      },
      // 安全设置-修改密码
      {
        name: 'Password',
        path: '/password',
        meta: {
          title: '重置密码'
        },
        component: () => import('../views/safe/password.vue')
      }
    ]
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
