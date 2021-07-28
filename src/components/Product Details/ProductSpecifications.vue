<template>
  <div class="product-specifications">
    <h2>Product Specifications</h2>
    <specs-table
      :wheel-image-url="wheelImageUrl"
      :attributes-list="productSpecifications.SpecificationAttributes"/>
  </div>
</template>

<script>
import SpecsTable from '../Shared/SpecsTable'

export default {
  name: 'product-specifications',
  components: {SpecsTable},
  props: {
    productSpecifications: {
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
