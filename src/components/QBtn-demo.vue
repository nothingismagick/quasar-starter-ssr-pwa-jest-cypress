<template lang="pug">
  div
    span {{ counter }}
    q-btn(@click="increment()")
</template>

<script>
  // MOVE THIS FILE TO THE /src/components folder
  export default {
    data () {
      return {
        counter: 0
      }
    },
    methods: {
      increment () {
        this.counter++
      }
    }
  }
</script>
