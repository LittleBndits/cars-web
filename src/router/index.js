import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/index/index";

Vue.use(VueRouter);

const routes = [
  {
    name:"Index",
    path: "/",
    component: Home,
    children: [
      {
        name: "User",
        path: "/user",
        component: () => import("../views/user/index")
      },
      // 安全设置-首页
      {
        name:'Safe',
        path:'/safe',
        component: () => import("../views/safe/index.vue")
      },
      // 安全设置-修改密码
      {
        name:'Password',
        path:'/password',
        component: () => import("../views/safe/password.vue")
      }
    ]
  }
];

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


export default router;
