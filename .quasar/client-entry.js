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


import Vue from 'vue'
import createApp from './app.js'


import 'app/src-pwa/register-service-worker.js'



import pI18n from 'src/plugins/i18n'

import pAxios from 'src/plugins/axios'

import pVuelidate from 'src/plugins/vuelidate'



import { addPreFetchHooks } from './client-prefetch.js'



import FastClick from 'fastclick'










const { app, store, router } = createApp()



  // Needed only for iOS PWAs
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && window.navigator.standalone) {

  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)

}




;[pI18n,pAxios,pVuelidate].forEach(plugin => {
  plugin({
    app,
    router,
    store,
    Vue,
    ssrContext: null
  })
})




  // prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}


const appInstance = new Vue(app)

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  
  addPreFetchHooks(router, store)
  
  appInstance.$mount('#q-app')
})


