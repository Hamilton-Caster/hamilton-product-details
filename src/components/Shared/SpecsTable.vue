<template>
  <div class="specs-table panel panel-default">
    <div
      v-if="specImage != null && showWheelTypeImage"
      class="specs-table-item config-image">
      <a
        v-if="wheelTypeUrl"
        :href="wheelTypeUrl">
        <img
          :src="specImage.Value"
          class="application-image"
          :alt="specImage.Name">
      </a>
      <img
        v-else
        :src="specImage.Value"
        class="application-image"
        :alt="specImage.Name">
    </div>
    <div
      class="product-spec-image"
      v-else-if="wheelImageUrl">
      <img
        :src="wheelImageUrl"
        class="application-image">
    </div>

    <div
      class="specs-table-item ratings row"
      v-for="(rating, ratingIndex) in ratings"
      :key="ratingIndex">
      <div
        class="col-md-6">
        {{ rating.Name }}
        <template
          v-if="rating.HasToolTip">
          <md-tooltip
            class="info-popopver specs"
            md-direction="top">
            <div class="inner-popover">
              <span
                class="popover-description"
                v-html="rating.ToolTipValue"></span>
            </div>
          </md-tooltip>
          <font-awesome-icon
            class="spec-info-icon"
            :icon="['fal', 'circle-info']" />
        </template>
      </div>
      <rating-blocks
        class="col-md-6" :rating="parseFloat(rating.Value)" />
    </div>
    <template
      v-for="(attribute, attributeIndex) in attributesList">
      <detail-text
        v-if="attribute.Type !== AttributeTypes.Rating && !attribute.Value.includes('/images/')"
        :key="attributeIndex"
        v-bind="attribute" />
    </template>
  </div>
</template>

<script>
  import DetailText from './DetailText'
  import RatingBlocks from './RatingBlocks'
  import { AttributeTypes } from '../enums'

  export default {
    name: 'specs-table',
    components: {RatingBlocks, DetailText},
    props: {
      index: {
        type: Number,
        default: 0
      },
      attributesList: {
        type: Array,
        default: () => []
      },
      wheelTypeUrl: {
        type: String
      },
      showWheelTypeImage: {
        type: Boolean
      },
      wheelImageUrl: {
        type: String
      }
    },
    data: () => ({
      ratings: [],
      specImage: null,
      AttributeTypes
    }),
    created () {
      this.ratings = this.attributesList.filter(attr => attr.Type === AttributeTypes.Rating && !attr.Value.includes('/images/') )
      this.ratings.forEach(rating => parseInt(rating.Value))
      this.specImage = this.attributesList.find(attr => attr.Value.includes('/images/'))
    }
  }
</script>

<style lang="scss">
  @import "../../assets/variables";

  .specifications {
    @media screen and (max-width: $medium) {
      margin-top: 1.5rem;
      h2 {
        font-size: 2rem;
        padding: 1rem 0 0.5rem;
      }
    }

    .config-image {
      text-align: center;

      img {
        width: 45%;
        height: auto;
      }
    }
    $grey: rgba(168,173,177,1);
    $padding: 15px;

    .ratings-border {
      border-color: $grey;
      display: block;
      margin-left: -$padding;
      margin-right: -$padding;
      padding-bottom: $padding;
      position: relative;
      top: $padding;
    }
    .specs-table-item.ratings ul {
      margin:0px !important;
      line-height:12px;
    }
    .specs-table-item.ratings li{
      display: inline-block;
      width: 13px;
      height: 20px;
      background: rgba(168,173,177,1);
      margin: 0 3px 0 0;
      padding: 0;
      background-image: none;
      list-style-type:square;
    }
    @media (min-width: 1200px) {
      .specs-table-item ul li {
        width: 13px !important;
        height: 20px !important;
        margin: 0 3px 0 0 !important;
      }
    }
    .specs-table {
      min-width: 50%;
      font-size: 18px;
      line-height: 22px;
      border: none;
      border-radius: 0;

      .specs-table-item,
      .product-spec-image {
        font-size: 20px;
        line-height: 20px;
        border: solid #d2d2d2;
        border-width: 0 1px 1px 1px;
        // border-bottom: 1px solid $lightGrey;
        &:nth-child(2n) {
          background-color: #f6f6f6;
        }
        &:nth-child(odd) {
          background: $white;
        }
        &:first-of-type {
          background-color: $white;
          border-top-width: 1px;
        }
        > .col-md-6 {
          padding: .5rem 1rem;
          font-size: 1rem;
          & ~ .col-md-6 {
            padding-top: 0;
            text-align: right;
            border-left: 1px solid #d2d2d2;
          }
          @media screen and (min-width: $medium) {
            padding: 1rem;
            & ~ .col-md-6 {
              padding-top: 1rem;
              text-align: left;
            }
            width: calc(100% - 19rem);
            &:first-child {
              width: 19rem;
            }

          }
          &:first-child {
            font-weight: 700;
          }
        }
        .spec-info-icon {
          font-size: 1rem;
          margin-left: .8rem;
          color: $primaryColor;
          font-weight: 300;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          font-smooth: always;
          -webkit-font-smoothing : subpixel-antialiased;
        }
        &.ratings {
          @media screen and (min-width: $medium) {
            & ~ .col-md-6 {
              padding-top: .75rem 1rem;
            }

          }
        }
      }
      .product-spec-image {
        text-align: center;
        img {
          height: auto;
          width: 45%;
        }
      }
    }
  }

  .info-popopver {
    &.md-tooltip.md-theme-default {
      color: $black;
      height: auto;
      background-color: $white;
      margin-bottom: -1.65rem;
      box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

      .inner-popover {
        background-color: rgba($white, 1);
        display: flex;
        width: 20rem;
        padding: .5rem 1rem;
        border-bottom: 1px solid rgba($lightGrey, .4);

        .popover-description {
          font-size: .8rem;
          white-space: normal;
          line-height: 1.2rem;
        }
      }
    }
  }


  .info-popopver.specs {
    &.md-tooltip.md-theme-default {
      .inner-popover {
        width: auto;
        max-width: 20rem;
      }
    }
  }

</style>
