<template lang="pug">
  div
    span {{ counter }}
    q-btn(@click="increment()")
</template>

<script>
export default {
  name: 'QBUTTON',
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
