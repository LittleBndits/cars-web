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
      },
      // 设置资金密码
      {
        path: '/capital',
        name: 'Capital',
        meta: {
          title: '设置资金密码'
        },
        component: () => import('../views/safe/capital')
      },
      // 绑定银行卡
      {
        path: '/bank',
        name: 'Bank',
        meta: {
          title: '绑定银行卡'
        },
        component: () => import('../views/safe/bank')
      },
      // 绑定银行卡
      {
        path: '/bankAdd',
        name: 'BankAdd',
        meta: {
          title: '添加银行卡'
        },
        component: () => import('../views/safe/bankAdd')
      },
      // 我的帐户
      {
        path: '/my',
        name: 'My',
        meta: {
          title: '我的帐户'
        },
        component: () => import('../views/my/index')
      },
      // 实名认证
      {
        path: '/authentication',
        name: 'Authentication',
        meta: {
          title: '实名认证'
        },
        component: () => import('../views/authentication/index')
      },
      // 充值
      {
        path: '/recharge',
        name: 'Recharge',
        meta: {
          title: '充值'
        },
        component: () => import('../views/recharge/index')
      },
      // 订单
      {
        path: '/order',
        name: 'Order',
        meta: {
          title: '租车订单'
        },
        component: () => import('../views/order/index')
      },
      {
        path: '/orderDetailed',
        name: 'OrderDetailed',
        meta: {
          title: '订单详情'
        },
        component: () => import('../views/order/detailed')
      },
      {
        path: '/payStatus',
        name: 'PayStatus',
        meta: {
          title: '支付状态'
        },
        component: () => import('../views/pay/status')
      },
      {
        path: '/payResult',
        name: 'PayResult',
        meta: {
          title: '支付结果'
        },
        component: () => import('../views/pay/result')
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
