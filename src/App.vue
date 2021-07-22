<template>
  <product-details
    v-if="moduleReady"
    :module-id="moduleId"
    :edit-mode="editMode"
    :detail-link="detailLink"/>
</template>

<script>
import ProductDetails from './components/Product Details/ProductDetails.vue'
import { Enumeration } from './utilities/enums'

// TODO: update to name of module
const DisplayType = new Enumeration({
  ProductDetails: 'ProductDetails_ProductDetails'
})

export default {
  name: 'product-details-app',
  components: {
    ProductDetails
  },
  props: {
    editMode: {
      type: String
    }
  },
  data: () => ({
    moduleId: null,
    moduleReady: false,
    moduleUsage: '',
    detailLink: null
  }),
  mounted () {
    console.log('test load')
    if (this.$el && this.$el.parentNode) {
      // get the module id from the parent div to pass to apis for security
      this.moduleId = parseInt(this.$el.parentNode.id.replace('app-', ''))
      // this.moduleUsage = this.$el.parentNode.dataset.moduleUsage
      this.moduleReady = true
      this.detailLink = this.$el.parentNode.dataset.detailLink
      console.log('mounted :: this.$el.parentNode.dataset.commodityId', this.$el.parentNode.dataset.commodityId)

      this.$el.parentNode.classList.add('product-details-module-wrap')

    }
  }
}
</script>

<style lang="scss">
  @import "assets/variables";

  // Override md-theme bg color
  html {
    &.md-theme-default {
      background-color: transparent !important;
    }
  }

  .md-body-1, .md-body-2, body#Body {
    letter-spacing: 0;
  }

  .product-details-module-wrapwrap {
    margin: -1.5rem -15px 0;
    @media screen and (min-width: $medium)  {
      margin: -2.5rem -15px 0;
    }

  }

  // Transition fade
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

</style>
