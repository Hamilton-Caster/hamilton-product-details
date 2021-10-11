<template>
  <div
    class="part-option"
    :class="{'is-valid': isValid}">
    <div class="part-option-header">
      <div class="option-image-wrap">
        <img
          class="option-image"
          :src="partOption.ImageUrl"
          :alt="partOption.Description">
      </div>
      <h3 v-html="partOption.Description">
      </h3>
    </div>
    <div class="option-lower">
      <div class="part-details">
        <div>
          <span
            v-if="this.partOption.UnitPrice !== 0"
            class="price-label">{{ partOption.UnitPriceLabel }}</span>
          <span class="price-value"> {{ displayPrice }}</span>
        </div>
        <div
          v-if="partOption.Availability">
          Availability: <span v-html="partOption.Availability"></span>
        </div>
      </div>
      <div
        class="part-option-checkbox md-layout md-gutter">
        <div
          v-if="isValid"
          class="md-layout-item md-size-100"
          @click.stop="onOptionClick">
          <md-field
            class="checkbox">
            <md-checkbox
              v-model="isSelected">
              Include with {{ productId }}
            </md-checkbox>
          </md-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'part-option',
  props: {
    partOption: {
      type: Object,
      default: () => {}
    },
    selectedPartOptions: {
      type: Array
    },
    productId: {
      type: String
    }
  },
  data () {
    return {
      isSelected: null
    }
  },
  watch: {
    isSelected: {
      handler: function (isSelected) {
        let partOptionsList = [...this.selectedPartOptions]
        if (isSelected) {
          partOptionsList.push({
            partId: this.partOption.PartID,
            unitPrice: parseInt(this.partOption.UnitPrice)
          })
        } else {
          partOptionsList = partOptionsList.filter(option => option.partId !== this.partOption.PartID)
        }
        this.$emit('update:selected-part-options', partOptionsList)
      }
    },
  },
  computed: {
    displayPrice () {
      return this.partOption.UnitPrice !== 0 ? `$${this.partOption.UnitPrice}` : 'Please Call for Pricing'
    },
    isValid () {
      return this.partOption.UnitPrice !== 0
    }
  },
  methods: {
    onOptionClick () {
      this.isSelected = !this.isSelected
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>

<style lang="scss">
  @import "../../assets/variables";

  .part-option {
    border: 1px solid #b4b4b4;
    padding: 0 1rem;
    background: #fff;
    width: 100%;
    transition: background .2s ease-in-out;
    display: inline-flex!important;
    margin-bottom: .8rem;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: column;

    &.is-valid {
      border: 1px solid $darkGrey;

      &:hover {
        background: darken($lightGreyBg, 5%);
      }
    }


    @media screen and (min-width: $medium) {
      width: calc(50% - 1rem);
      margin: 0 .5rem .8rem;
    }
    @media screen and (min-width: $x-large) {
      width: 16rem;
    }
    //@media screen and (min-width: $xx-large) {
    //  max-width: 30rem;
    //}

    .part-option-header {
      //display: flex;
      //flex-direction: row;
      //flex-wrap: wrap;
      //align-items: center;

      h3 {
        line-height: 1.25;
        font-size: 1rem;
        margin: 1rem 0 .7rem;
        text-align: center;
      }

      .option-image-wrap {
        text-align: center;
        img {
          width: 80%;
          max-width: 14.5rem;
        }
      }
    }


    .option-lower {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;

      .part-details {
        text-align: center;
      }
      .price-label {
        font-size: 1rem;
        font-weight: 700;
      }
      .price-value {
        font-size: 1rem;
      }
      .price-caption {
        font-style: italic;
        margin: 0 .25rem 0 1rem;
      }
      .pricing-info-icon {
        color: $primaryColor;
      }
      .price-caption {
        font-style: italic;
        margin: 0 .25rem 0 1rem;
      }
      .md-layout.md-gutter>.md-layout-item {
        padding-left: 0;
        padding-right: 0;
      }
      .part-option-checkbox {
        margin-left: 0;
        margin-right: 0;
        align-self: center;
        height: 3.5rem;

        .checkbox.md-field {
          display: block;
          padding: 0;
          margin-bottom: 0;
        }
        @media screen and (min-width: $large) {
          margin-left: 0;
          margin-right: 0;
        }
      }
    }
  }
</style>
