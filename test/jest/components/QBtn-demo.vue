<template>
  <div>
    <span>{{ counter }}</span>
    <q-btn @click="increment()"></q-btn>
  </div>
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
