<template>
  <div class="product-specifications">
    <h2 class="product-spec-title">Product Specifications</h2>
    <specs-table
      :wheel-image-url="wheelImageUrl"
      :attributes-list="productSpecifications.SpecificationAttributes" />
  </div>
</template>

<script>
import SpecsTable from '../Shared/SpecsTable'
import { ConfiguratorResultsPage, ScrollToResults, ProductTypes } from '../enums'
import { getProductConfiguratorAttributes } from '../../api'

export default {
  name: 'product-specifications',
  components: {SpecsTable},
  props: {
    hasProductConfigAttributes: {
      type: Boolean
    },
    productSpecifications: {
      type: Object
    },
    productType: {
      type: String
    },
    wheelImageUrl: {
      type: String
    },
    selectedAttrs: {
      type: Array,
      default: () => []
    },
    searchDisabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      configuratorList: null,
      isSearchDisabled: true,
      selectedAttributes: [],
      ProductTypes
    }
  },
  methods: {
    setupFilters () {
      let configuratorParams = {
        ConfiguratorType: ProductTypes.getKey(ProductTypes.Casters),
        AttributeValues: [],
        CurrentPageNumber: 1,
        SortBy: '',
        SortOrder: ''
      }

      let antiForgery = document.getElementsByName("__RequestVerificationToken")[0].value
      getProductConfiguratorAttributes(this.$parent.svc, antiForgery, configuratorParams)
        .then(res => {
          let configuratorList = res.data.ProductConfiguratorAttributes
          this.configuratorList = configuratorList

          this.productSpecifications.SpecificationAttributes.forEach(attribute => {
            if (attribute.IsProductConfiguratorAttribute && attribute.ProductConfiguratorID !== 0 && attribute.ProductConfiguratorLineNumber !== 0) {
              this.addFilters(attribute, configuratorList)
            }
          })
        })

    },
    addFilters (item, configuratorList) {
      let selectedGroup = null
      for (let i = 0; i < configuratorList.length; i++) {
        selectedGroup = configuratorList[i].GROUP_ATTRIBUTES.find(attribute => attribute.ATTRIBUTE_ID === item.AttributeID)
        if (selectedGroup != null) {
          break
        }

      }
      // let attributeGroup = configuratorList.find(group => {
      //   console.log('attributeGroup :: group, item', group, item)
      //   selectedGroup = group.GROUP_ATTRIBUTES.find(attribute => attribute.ATTRIBUTE_ID === item.AttributeID)
      //   return selectedGroup
      // })

      if (selectedGroup != null) {
        this.selectedAttributes.push({
          ID: selectedGroup.ID,
          ATTRIBUTE_ID: selectedGroup.ATTRIBUTE_ID,
          ATTRIBUTE_VALUES: [selectedGroup.ATTRIBUTE_VALUES.find(listItem => listItem.LINE_NO === item.ProductConfiguratorLineNumber)],
          label: selectedGroup.CAPTION,
          // DISPLAY_TYPE: selectedGroup.DISPLAY_TYPE,
          // TYPE: selectedGroup.TYPE,
          name: selectedGroup.NAME
        })
        this.$emit('update:selected-attrs', this.selectedAttributes)
      }
      this.isSearchDisabled = this.selectedAttributes.length === 0
      this.$emit('update:search-disabled', this.selectedAttributes.length === 0)

    }
  },
  created () {
  },
  mounted () {
    if (this.hasProductConfigAttributes) {
      this.setupFilters()
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/variables";

  .product-specifications {
    display: flex;
    flex-direction: column;
    .product-spec-title {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      @media screen and (min-width: $large) {
        flex-direction: row;
      }
    }

    .product-search-button {
      &.disabled {
        opacity: .7;
        cursor: default;
      }
    }
   }

</style>
