import Vue from 'vue'
import createApplication from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'
import io from 'socket.io-client'

const socket = io(process.env.API_BASE_URL, {
  transports: ['websocket']
})
const feathers = createApplication()

feathers.configure(socketio(socket))

if (typeof window !== 'undefined') {

  feathers.configure(authentication({
    header: 'Authorization', // the default authorization header for REST
    path: '/api/authentication', // the server-side authentication service path
    jwtStrategy: 'jwt', // the name of the JWT authentication strategy
    entity: 'user', // the entity you are authenticating (ie. a users)
    service: 'users', // the service to look up the entity
    cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
    storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
    storage: window.localStorage // Passing a WebStorage-compatible object to enable automatic storage on the client.
  }))
} else {
  feathers.configure(authentication({
    header: 'Authorization', // the default authorization header for REST
    path: '/api/authentication', // the server-side authentication service path
    jwtStrategy: 'jwt', // the name of the JWT authentication strategy
    entity: 'user', // the entity you are authenticating (ie. a users)
    service: 'users', // the service to look up the entity
    cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
    storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
  }))
}

Vue.prototype.$feathers = feathers

export default feathers
