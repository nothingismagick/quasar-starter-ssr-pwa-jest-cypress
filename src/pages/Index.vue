<template lang="pug">
  q-page.flex.flex-center
    div(class="row gutter-xs")
      div(class="col-12")
        img(alt="Quasar logo", src="~assets/quasar-logo-full.svg")
      div(class="col-12 q-mt-lg")
        q-btn(class="q-mr-lg" color="primary" label="Login" @click="login")
      div(class="col-12")
        router-link(to="/admin") Go to Admin
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  methods: {
    login () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
