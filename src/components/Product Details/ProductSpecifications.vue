<template>
  <div class="product-specifications">
    <h2>Product Specifications</h2>
    <specs-table
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
