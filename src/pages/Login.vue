<template>
  <div class="index-page bg-grey-2 window-height window-width column items-center no-wrap">
    <div class="text-center">
      <div class="column no-wrap flex-center group">
        <q-field
          icon="mail"
          :error="$v.email.$error"
          :error-label="$t('auth.error.validation.typeValidEmail')"
          class="q-mb-md full-width"
        >
          <q-input
                  autofocus
                  type="email"
                  v-model="email"
                  :placeholder="$t('auth.yourEmailAddress')"
                  @keyup.enter="submit()"
                  @blur="$v.email.$touch"/>
        </q-field>
        <q-field class="full-width"
            icon="vpn key"
            :error="$v.password.$error"
            :error-label="$t('auth.error.validation.typePassword')"
        >
          <q-input
                  v-model="password"
                  type="password"
                  :placeholder="$t('auth.yourPassword')"
                  @keyup.enter="submit()"
                  @blur="$v.password.$touch"/>
        </q-field>

        <q-btn color="primary" @click="submit()" class="full-width" icon-right="launch" no-ripple> {{ buttonLabel }} </q-btn>

        <q-checkbox class="col-xs-12 q-mb-md text-weight-light" v-model="reset" :label="$t('auth.forgotPassword')" @input="resetOptionChange"/>

        <q-alert
            v-if="error"
            type="negative"
            appear
            :actions="[{ label: $t('label.dismiss'), handler: () => dismissError() }]"
            class="q-mt-lg q-mb-sm"
        >
          {{ error.message }}
        </q-alert>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import {email, required} from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      email: undefined,
      password: undefined,
      register: false,
      reset: false,
      error: undefined,
      userId: undefined,
      title: 'Quasar Feathers App'
    }
  },
  validations: {
    email: {required, email},
    password: {required}
  },
  computed: {
    buttonLabel () {
      return this.register ? this.$t('auth.createAccount') : (this.reset ? this.$t('auth.sendPasswordReset') : this.$t('auth.login'))
    }
  },
  methods: {
    launch () {
      this.$router.push({ name: 'login' })
    },
    resetOptionChange () {
      this.register = false
    },
    submit () {
      this.authenticate({strategy: 'local', email: this.email, password: this.password})
        .then((response) => {
          this.$q.notify({
            message: this.$t('auth.loggedIn'),
            type: 'positive'
          })
          this.$router.push(this.$route.query.redirect || {name: 'admin'})
        })
        // Just use the returned error instead of mapping it from the store.
        .catch(error => {
          // Convert the error to a plain object and add a message.
          console.log('error')
          let type = error.className
          error = Object.assign({}, error)
          error.message = (type === 'not-authenticated')
            ? this.$t('auth.error.incorrectLogin')
            : this.$t('auth.error.generalError')
          this.error = error
        })
    },
    dismissError () {
      this.error = undefined
      this.clearAuthenticateError()
    },
    ...mapMutations('auth', {
      clearAuthenticateError: 'clearAuthenticateError'
    }),
    ...mapActions('auth', ['authenticate'])
  }
}
</script>

<style lang="stylus">
</style>
