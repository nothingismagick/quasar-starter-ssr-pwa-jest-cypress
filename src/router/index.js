import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
// import store from '../store'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (Vue.prototype.$auth.isAuth()) {
        next()
      } else {
        // Try to authenticate with existing token in case of page load/refresh.
        store.dispatch('auth/authenticate', {})
          .finally(() => {
            // Check again to be sure.
            if (Vue.prototype.$auth.isAuth()) {
              next()
            } else {
              // Request a login.
              next({
                name: 'login',
                query: {redirect: to.fullPath}
              })
            }
          })
      }
    } else {
      // Try to authenticate with existing token in case of page load/refresh.
      // This way if the user is authenticated it will show even on the routes
      // that don't explicitly require authentication.
      store.dispatch('auth/authenticate', {})
        .finally(() => next())
    }
  })

  return Router
}
