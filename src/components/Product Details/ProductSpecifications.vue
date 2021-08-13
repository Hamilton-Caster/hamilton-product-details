<template>
  <div class="product-specifications">
    <h2>Product Specifications</h2>
    <md-button
      class="md-primary"
      v-if="hasProductConfigAttributes"
      @click="onSearchParts">
      <font-awesome-icon :icon="['fas', 'search']" />
      Search Similar Parts
    </md-button>
    <specs-table
      :wheel-image-url="wheelImageUrl"
      :attributes-list="productSpecifications.SpecificationAttributes" />
  </div>
</template>

<script>
import SpecsTable from '../Shared/SpecsTable'
import { ConfiguratorResultsPage, ScrollToResults } from '../enums'
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
    }
  },
  data () {
    return {
      configuratorList: null,
      selectedAttributes: [],
    }
  },
  methods: {
    onSearchParts () {
      this.setSessionStorage(this.productType, this.selectedAttributes)
    },
    setSessionStorage (ConfiguratorType, selectedAttributes) {
      sessionStorage.setItem(ScrollToResults, JSON.stringify(true))
      sessionStorage.setItem('ConfiguratorType', JSON.stringify(ConfiguratorType))
      if (selectedAttributes != null) {
        let key = `SelectedAttributes_${ConfiguratorType}`
        if (selectedAttributes.length > 0) {
          sessionStorage.setItem(key, JSON.stringify(selectedAttributes))
        } else {
          sessionStorage.setItem(key, JSON.stringify([]))
        }
      }
      this.goToResultsPage()
    },
    setupFilters () {
      let configuratorParams = {
        ConfiguratorType: this.productType,
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
      let attributeGroup = configuratorList.find(group => {
        selectedGroup = group.GROUP_ATTRIBUTES.find(attribute => attribute.ID === item.ProductConfiguratorID)
        return selectedGroup
      })
      console.log('addFilters :: SelectedAttribute', attributeGroup)
      console.log('addFilters :: selectedGroup', selectedGroup)
      let sel

      this.selectedAttributes.push({
        ID: selectedGroup.ID,
        ATTRIBUTE_ID: selectedGroup.ATTRIBUTE_ID,
        ATTRIBUTE_VALUES: [selectedGroup.ATTRIBUTE_VALUES.find(listItem => listItem.LINE_NO === item.ProductConfiguratorLineNumber)],
        label: selectedGroup.label,
        DISPLAY_TYPE: selectedGroup.DISPLAY_TYPE,
        TYPE: selectedGroup.TYPE,
        name: selectedGroup.NAME
      })
    },
    goToResultsPage () {
      window.location.href = `${location.origin}/${ConfiguratorResultsPage}`
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
  .product-specifications {
    display: flex;
    flex-direction: column;
    .md-button {
      justify-self: flex-end;
      margin: -.2rem 0 1rem;
      height: 3rem;
      .md-button-content {
        font-size: 1rem;
      }
    }
   }

</style>
