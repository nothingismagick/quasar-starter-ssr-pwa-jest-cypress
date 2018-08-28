<template lang="pug">
  q-page.flex.flex-center
    div(class="row gutter-xs")
      div(class="col-12 q-mt-lg")
      div(class="col-12")
        router-link(v-if="getAuth()" to="/admin/users") Go to Users
        q-btn(v-else class="q-mr-lg" color="primary" label="Login" @click="login")
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  methods: {
    login () {
      this.$router.push({ name: 'login' })
    },
    getAuth() {
      if (typeof this.$auth !== 'undefined') {
        return this.$auth.isAuth()
      } else {
        return false
      }
    }
  }
}
</script>
