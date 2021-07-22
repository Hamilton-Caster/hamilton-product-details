<template>
  <div class="specs-table panel panel-default">
    <div
      v-if="specImage != null"
      class="specs-table-item config-image">
      <a :href="wheelTypeUrl">
        <img
          :src="specImage.Value"
          class="application-image"
          :alt="specImage.Name">
      </a>
    </div>

    <div
      class="specs-table-item ratings row"
      v-for="(rating, index) in ratings"
      :key="index">
      <div
        class="col-md-6">
        {{ rating.Name }}
        <template
          v-if="rating.HasToolTip">
          <md-tooltip
            class="info-popopver"
            md-direction="top">
            <div class="inner-popover">
              <span
                class="popover-description"
                v-html="rating.ToolTipValue"></span>
            </div>
          </md-tooltip>
          <font-awesome-icon
            class="spec-info-icon"
            :icon="['fas', 'info-circle']" />
        </template>
      </div>
      <rating-blocks
        class="col-md-6" :rating="parseFloat(rating.Value)" />
    </div>
    <template
      v-for="(attribute, attributeIndex) in attributesList">
      <detail-text
        v-if="attribute.ATTRIBUTE_TYPE !== AttributeTypes.Rating && !attribute.Value.includes('/images/')"
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

  .config-image {
    min-width: 200px;
    min-height: 200px;
    text-align: center;

    img {
      width: auto;
      height: 100%;
      max-height: 200px;
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
  .specs-table-item.ratings ul {margin:0px !important;}
  .specs-table-item.ratings li{
    display: inline-block;
    width: 13px;
    height: 20px;
    background: rgba(168,173,177,1);
    margin: 5px 3px 0 0;
    padding: 0;
    background-image: none;
    list-style-type:square;
  }
  @media (min-width: 1200px) {
    .specs-table-item ul li {
      width: 13px !important;
      height: 20px !important;
      margin: 5px 3px 0 0 !important;
    }
  }
  .specs-table {
    min-width: 50%;
    font-size: 18px;
    line-height: 22px;
    border: 1px solid $lightGrey;
    border-radius: 0;
  }
  .specs-table-item {
    font-size: 20px;
    line-height: 20px;
    border-bottom: 1px solid $lightGrey;
    > .col-md-6 {
      padding: 1rem;
      &:first-child {
        font-weight: 700;
      }
    }
    .spec-info-icon {
      font-size: 1rem;
      margin-left: .8rem;
      color: $primaryColor;
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

</style>
