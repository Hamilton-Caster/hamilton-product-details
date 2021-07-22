<template>
  <chart
    :options="formData" />
</template>

<script>
import { Chart } from 'highcharts-vue'

export default {
  name: 'chart-item',
  components: {
    Chart
  },
  props: {
    formData: {
      type: Object
    }
  },
  data () {
    return {}
  },
  methods: {},
  created () {

  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">

</style>
