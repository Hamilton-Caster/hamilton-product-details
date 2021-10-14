<template>
  <div class="product-details-image">
    <div
      key="standard"
      class="image-wrap">
      <img
        :src="currentProductImage"
        :alt="productDetails.PartID">
      <p class="image-caption" v-if="productDetails.FeaturedImageCaption">
        {{ productDetails.FeaturedImageCaption }}
      </p>
    </div>
  </div>
</template>

<script>


export default {
  name: 'product-image',
  props: {
    productDetails: {
      type: Object,
      required : true
    }
  },
  data () {
    return { }
  },
  computed: {
    currentProductImage () {
      return this.productDetails.FeaturedImageURL
    }
  },
  methods: {
  },
  created () {

  },
  mounted () {
  }
}
</script>

<style lang="scss">
  @import "../../assets/variables";

  $mobileImageSize:   21.875rem;
  $standardImageSize: 31.25rem;

  .product-details-wrapper {
    position: relative;
    .product-details-image {
      text-align: center;
      min-height: $mobileImageSize;
      margin-bottom: 2rem;
      height: $mobileImageSize;

      @media screen and (min-width: $medium) {
        height: $standardImageSize;
      }

      .image-wrap {
        img {
          width: 100%;
        }
      }

      img {
        max-width: $mobileImageSize;
        max-height: $mobileImageSize;
        @media screen and (min-width: $medium) {
          max-width: $standardImageSize;
          max-height: $standardImageSize;
        }
      }

      .image-caption {
        font-size: 1rem;
        font-style: italic;
        text-align: center;
      }

    }
  }
</style>
