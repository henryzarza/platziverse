<template>
  <div>
    <metric uuid="77287010-021c-4618-9a98-21f312d47586" type="promiseMetric"></metric>
    <agent
      v-for="agent in agents"
      :uuid="agent.uuid"
      :key="agent.uuid">
    </agent>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<style>
  body {
    font-family: Arial;
    background: #f8f8f8;
    margin: 0;
  }
</style>

<script>
module.exports = {
  data () {
    return {
      agents: [],
      error: null
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
    }
  }
}
</script>