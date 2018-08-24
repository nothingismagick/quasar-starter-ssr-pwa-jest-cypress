export default ({ app, router, store, Vue }) => {
  const auth = {
    isAuth () {
      return store.state.auth.user !== null
    },
    login () {
      router.push({ name: 'login' })
    },
    logout () {
      store.dispatch('auth/logout')
        .then(() => {
          Vue.prototype.$q.notify({
            message: this.$t('auth.loggedOut'),
            type: 'info'
          })
          router.push({ name: 'home' })
        })
    }
  }

  Vue.prototype.$auth = auth
}
