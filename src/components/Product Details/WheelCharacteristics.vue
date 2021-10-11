<template>
  <div class="wheel-characteristics">
    <h2>Wheel Characteristics</h2>
    <specs-table
      :wheel-image-url="wheelImageUrl"
      :show-wheel-type-image="showWheelTypeImage"
      :attributes-list="wheelCharacteristics.WheelCharacteristics" />
  </div>
</template>

<script>
import SpecsTable from '../Shared/SpecsTable'
export default {
  name: 'wheel-characteristics',
  components: {SpecsTable},
  props: {
    showWheelTypeImage: {
      type: Boolean
    },
    wheelCharacteristics: {
      type: Object
    },
    wheelImageUrl: {
      type: String
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
