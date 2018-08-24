import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathers from '../api/feathers' // Cannot load this as a plugin :-(

import example from './module-example'

const { service, auth } = feathersVuex(feathers, {
  idField: 'id', // The field in each record that will contain the id
  autoRemove: false, // automatically remove records missing from responses (only use with feathers-rest)
  nameStyle: 'short', // Determines the source of the module name. 'short' or 'path'
  enableEvents: true // Set to false to explicitly disable socket event handlers.
})

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      example
    },
    plugins: [
      service('users'),

      auth({
        userService: 'users'
      })
    ]
  })

  return Store
}
