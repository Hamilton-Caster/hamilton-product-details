<template>
  <div class="product-details-image">
    <transition
      name="fade"
      mode="out-in">
      <div v-if="!showThreeD" key="standard">
        <img
          :src="currentProductImage"
          :alt="productDetails.BasePartID">
        <p class="image-caption" v-if="productDetails.FeaturedImageCaption">{{ productDetails.FeaturedImageCaption}}</p>
      </div>
      <div v-else key="3d">
        <img
          :src="currentProductImage"
          :alt="productDetails.Wheel_ImageURL">
        <p class="image-caption" v-if="productDetails.FeaturedImageCaption">This will be the 3d view</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'product-image',
  props: {
    productDetails: {
      type: Object,
      required : true
    },
    showThreeD: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    currentProductImage () {
      return this.productDetails.FeaturedImageURL
    }
  },
  methods: {},
  created () {

  },
  mounted () {

  }
}
</script>

<style lang="scss">
  .product-details-image {
    text-align: center;
    min-height: 500px;

    .image-caption {
      font-size: 1rem;
      font-style: italic;
      text-align: center;
    }
  }
</style>
