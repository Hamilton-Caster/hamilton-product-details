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
  @import "../../assets/variables";

  .part-options-wrapper {
    background-color: $lightGreyBg;
    padding: 1rem;
    width: calc(100% + 1.96rem);
    margin: 0 -1rem;
    @media screen and (min-width: $medium) {
      padding: 3rem 1rem 3rem;
    }

    > h2 {
      text-align: center;
      padding-bottom: 1rem;
      @media screen and (min-width: $medium) {
        padding-bottom: 3rem;
      }
    }

    .part-options {
      list-style: none;
      display: flex;
      margin: 0 auto;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
</style>
