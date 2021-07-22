<template>
  <div class="wheel-characteristics">
    <h2>Wheel Characteristics</h2>
    <specs-table
      :wheel-type-url="wheelCharacteristics.WheelTypeUrl"
      :attributes-list="wheelCharacteristics.WheelCharacteristics"/>
  </div>
</template>

<script>
import SpecsTable from '../Shared/SpecsTable'
export default {
  name: 'wheel-characteristics',
  components: {SpecsTable},
  props: {
    wheelCharacteristics: {
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
