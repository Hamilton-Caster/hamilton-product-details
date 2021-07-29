<template>
  <li
    class="part-option"
    :class="{'is-valid': isValid}"
    @click.stop="onOptionClick">
    <div class="part-option-header clearfix">
      <img
        class="option-image"
        :src="partOption.ImageUrl"
        :alt="partOption.Description">
      <div class="part-details">
        <h3 v-html="partOption.Description">
        </h3>
        <div>
          <span class="price-label">{{ partOption.UnitPriceLabel }}</span>
          <span class="price-value"> ${{ displayPrice }}</span>
        </div>
        <div
          v-if="partOption.Availability">
          Availability: <span v-html="partOption.Availability"></span>
        </div>
      </div>
    </div>
    <div
      v-if="isValid"
      class="part-option-checkbox md-layout md-gutter">
      <div class="md-layout-item md-size-100">
        <md-field
          class="checkbox">
          <md-checkbox
            v-model="isSelected">
            Include with {{ productId }}
          </md-checkbox>
        </md-field>
      </div>
    </div>

  </li>
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
        console.log('watch :: isSelected', isSelected)
        let partOptionsList = [...this.selectedPartOptions]
        if (isSelected) {
          partOptionsList.push(this.partOption.PartID)
        } else {
          partOptionsList = partOptionsList.filter(option => option !== this.partOption.PartID)
        }
        this.$emit('update:selected-part-options', partOptionsList)

      }
    },
  },
  computed: {
    displayPrice () {
      return this.partOption.UnitPrice || 'Please Call for Pricing'
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

<style scoped lang="scss">
  @import "../../assets/variables";

  .part-option {
    border: 1px solid $mediumLightGrey;
    padding: 1rem;
    background: $white;
    width: 100%;
    transition: background .2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: .8rem;

    &.is-valid {
      border: 1px solid $darkGrey;
      cursor: pointer;

      &:hover {
        background: darken($lightGreyBg, 5%);
      }
    }


    @media screen and (min-width: $medium) {
      width: calc(50% - 1rem);
      margin: 0 .5rem .8rem;
    }
    @media screen and (min-width: $x-large) {
      width: calc(32% - 1rem);
    }
    @media screen and (min-width: $xx-large) {
      width: calc(24% - 1rem);
    }

      h3 {
        line-height: 1.25;
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: .5rem;
      }

    .option-image {
      max-width: 10rem;
      float: left;
      padding-right: 2rem;
    }
    .part-details {
      float: right;
      width: calc(100% - 11rem);
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
      float: none;
      clear: both;
      margin-left: 0;
      margin-right: 0;
      .checkbox.md-field {
        text-align: center;
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
</style>
