import router from './index'
import store from '../store/index'

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    const routerName = to.meta.title
    document.title = routerName
    store.commit('app/SET_ROUTER_TITLE', routerName)
  }
  next()
})
