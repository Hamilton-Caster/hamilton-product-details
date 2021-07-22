<template>
  <div class="part-options-wrapper">
    <h2>Recommended Available Options</h2>
    <ul class="part-options">
      <part-option
        v-for="partOption in partOptions"
        :key="partOption.PartID"
        :part-option="partOption"
        :selected-part-options.sync="selectedPartOptions"
        :product-id="productId"/>
    </ul>
  </div>
</template>

<script>
import PartOption from './PartOption'
export default {
  name: 'part-options',
  components: {PartOption},
  props: {
    partOptions: {
      type: Array,
      default: () => []
    },
    productId: {
      type: String
    },
    selectedPartsList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedPartOptions: []
    }
  },
  watch: {
    selectedPartOptions: {
      handler: function (selectedPartOptions) {
        this.$emit('update:selectedPartsList', selectedPartOptions)
      }
    }
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
