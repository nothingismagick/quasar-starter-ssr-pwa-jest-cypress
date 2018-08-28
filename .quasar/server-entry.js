/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding initialization code.
 * Use "quasar new plugin <name>" and add it there.
 * One plugin per concern. Then reference the file(s) in quasar.conf.js > plugins:
 * plugins: ['file', ...] // do not add ".js" extension to it.
 **/

import 'quasar-extras/roboto-font/roboto-font.css'

import 'quasar-extras/material-icons/material-icons.css'

import 'quasar-extras/fontawesome/fontawesome.css'



import 'quasar-extras/animate/fadeIn.css'

import 'quasar-extras/animate/fadeOut.css'


import 'quasar-app-styl'


import 'src/css/app.styl'


import createApp from './app.js'
import Vue from 'vue'

import App from 'app/src/App.vue'



import pluginI18n from 'src/plugins/i18n'

import pluginAxios from 'src/plugins/axios'

import pluginVuelidate from 'src/plugins/vuelidate'


// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  return new Promise(async (resolve, reject) => {
    const { app, store, router } = createApp(context)

    const
      { url } = context,
      { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      
      ;[pluginI18n,pluginAxios,pluginVuelidate].forEach(plugin => {
        plugin({
          app,
          router,
          store,
          Vue,
          ssrContext: context
        })
      })
      

      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      

      let redirected = false
      const redirect = url => {
        redirected = true
        reject({ url })
      }
      App.preFetch && matchedComponents.unshift(App)

      // Call preFetch hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      Promise.all(
        matchedComponents.map(c => {
          if (redirected) { return }
          if (c && c.preFetch) {
            return c.preFetch({
              store,
              ssrContext: context,
              currentRoute: router.currentRoute,
              redirect
            })
          }
        })
      )
      .then(() => {
        if (redirected) { return }

        context.state = store.state

        
        const App = new Vue(app)
        context.$getMetaHTML = App.$getMetaHTML(App)
        resolve(App)
        
      })
      .catch(reject)

      
    }, reject)
  })
}
