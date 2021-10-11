<template>
  <div class="part-options-wrapper">
    <h2>Recommended Available Options</h2>
    <div class="part-options">
      <vue-slick-carousel
        v-bind="carouselSettings">
        <part-option
          v-for="partOption in partOptions"
          :key="partOption.PartID"
          :part-option="partOption"
          :selected-part-options.sync="selectedPartOptions"
          :product-id="productId" />
      </vue-slick-carousel>
    </div>
  </div>
</template>

<script>
import PartOption from './PartOption'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'part-options',
  components: {
    PartOption,
    VueSlickCarousel
  },
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
      carouselSettings: {
        arrows: true,
        dots: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 1900,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 970,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      },
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

<style lang="scss">
  @import "../../assets/variables";

  .part-options-wrapper {
    background-color: $lightGreyBg;
    padding: 1rem;
    width: calc(100% + 3.9rem);
    margin: 0 -2rem;
    @media screen and (min-width: $medium) {
      padding: 1.3rem 1rem 1.5rem;
    }

    > h2 {
      text-align: center;
      padding-bottom: 1rem;
      @media screen and (min-width: $medium) {
        padding-bottom: 1.5rem;
      }
    }

    .part-options {
      margin: 0 auto;
      padding: 0 1rem;
      //justify-content: center;
      //flex-wrap: wrap;
      > div {
        position: relative;
      }
    }

  }
  .slick-slider.slick-initialized {
    position: relative;
    height: 100%;
    .slick-arrow {
      $arrowSize: -1.5rem;
      $arrowOffset: -#{$arrowSize};

      width: $arrowSize;
      height: $arrowSize;
      z-index: 10;
      &::before {
        color: $primaryColor;
      }
      &.slick-prev {
        left: $arrowOffset;
      }
      &.slick-next {
        right: $arrowOffset;
      }
    }
  }
  .slick-track {
    display: flex;
  }
  .slick-list {
    max-width: 100%;
    overflow: hidden;
  }
  .slick-slide {
    min-height: 100%;
    padding: 0 1rem .8rem;
    overflow: hidden;

    > div {
      height: 100%;
      > .part-option {
        height: 100%;
      }
    }

  }
</style>
