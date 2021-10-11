<template>
  <header class="parts-details-header">
    <div class="product-summary hide-desktop">
      <h1 class="mobile-title">
        <small>Part Details for</small>
        <span v-html="productDetails.BasePartID"></span>
      </h1>
      <span class="sub-head">
        Load Capacity (lbs.): <small>{{ productDetails.LoadCapacity }}</small>
      </span>
      <div class="sub-head">
        Availability: <div v-html="productDetails.Availability" class="small"></div>
      </div>
    </div>
    <product-image
      class="col-md-6"
      :product-details="productDetails" />
    <div class="product-summary col-md-6">
      <h1 class="hide-mobile">
        <small>Part Details for</small>
        <span v-html="productDetails.BasePartID"></span>
      </h1>
      <span class="sub-head hide-mobile">
        Load Capacity (lbs.): <small>{{ productDetails.LoadCapacity }}</small>
      </span>
      <div class="sub-head hide-mobile">
        Availability: <div v-html="productDetails.Availability" class="small"></div>
      </div>
      <p class="product-description">
        <span v-html="productDetails.Description"></span>
      </p>
      <div style="display:inline-block;">
        <md-tooltip
          v-if="isCadDownloading"
          class="info-popopver"
          md-direction="top">
          <div class="inner-popover">
            <span
              class="popover-description">
              Your file is being generated and will begin downloading soon.
            </span>
          </div>
        </md-tooltip>

        <md-button
          v-if="productDetails.CADDrawingValue === CADDrawingTypes.Local && productDetails.CADVersionAvailable"
          class="md-outline"
          @click="onDownloadCadClick">
          <font-awesome-icon :icon="['fas', 'download']" />
          Download CAD (step file)
        </md-button>
      </div>
      <md-button
        id="lbCAD"
        class="md-outline"
        :href="emailLink + productDetails.BasePartID">
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
        Request CAD File
      </md-button>
      <div style="display:inline-block;">
        <md-tooltip
          v-show="isPDFDownloading"
          class="info-popopver"
          md-direction="top">
          <div class="inner-popover">
            <span
              class="popover-description">
              Your datasheet is being generated and will begin downloading soon.
            </span>
          </div>
        </md-tooltip>
        <md-button
          v-if="productDetails.IsValidPart"
          class="md-outline"
          @click="onDownloadPDFClick">
          <font-awesome-icon :icon="['fas', 'file-pdf']" />
          PDF Datasheet
        </md-button>
      </div>
      <md-button
        v-if="isValidCadUser"
        class="md-outline"
        @click="onModifyPreferences">
        <font-awesome-icon :icon="['fas', 'gear']" />
        Download Preferences
      </md-button>
      <div class="price">
        <span class="price-label">{{ productDetails.UnitPriceLabel }}</span>
        <span class="price-value"> {{ displayPrice }}</span>
        <span class="caption-wrap">
          <span class="price-caption">{{ productDetails.PricingCaption }}</span>
          <md-tooltip
            v-if="productDetails.PricingMessage != ''"
            class="info-popopver"
            md-direction="top">
            <div class="inner-popover">
              <span
                class="popover-description"
                v-html="productDetails.PricingMessage"></span>
            </div>
          </md-tooltip>
          <span
            v-if="productDetails.PricingMessage != ''"
            class="pricing-info">More Details</span>
        </span>
      </div>
      <div
        v-if="!productDetails.IsObsoletePart"
        class="project md-layout md-gutter">
        <div class="md-layout-item md-small-size-25 md-size-15">
          <md-field>
            <label
              for="downloadProfileName">
              Quantity
            </label>
            <md-input
              id="downloadProfileName"
              type="number"
              v-model="productQuantity" />
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-50 md-size-50 button-wrap">
          <md-button
            class="md-primary"
            @click="addToProject">
            <font-awesome-icon :icon="['fas', 'folder-open']" />
            Add to Project
          </md-button>
        </div>
      </div>
      <div class="finder-button">
        <md-button
          class="md-outline md-theme-default product-search-button"
          :class="{'disabled': isSearchDisabled}"
          :disabled="isSearchDisabled"
          v-if="hasProductConfigAttributes"
          @click="onSearchParts">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          <span v-if="productType === ProductTypes.getKey(ProductTypes.Casters)">
            Find Similar Casters
          </span>
          <span v-else>
            Find Casters using this Wheel
          </span>
        </md-button>
      </div>
    </div>
  </header>
</template>

<script>
import ProductImage from './ProductImage'
import { addToCart } from '../../api'
import {CADDrawingTypes, ConfiguratorResultsPage, DownloadFormats, ProductTypes, ScrollToResults} from '../enums'
import helpers from '../../utilities/helpers'

export default {
  name: 'product-header',
  components: {ProductImage},
  props: {
    cadUser: {
      type: Object
    },
    productDetails: {
      type: Object,
      required: true
    },
    partsList: {
      type: Array
    },
    hasProductConfigAttributes: {
      type: Boolean,
      default: false
    },
    isValidCadUser: {
      type: Boolean,
      default: false
    },
    productType: {
      type: String
    },
    isSearchDisabled: {
      type: Boolean,
      default: true
    },
    selectedAttributes: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      emailLink: 'mailto:cad@hamiltoncaster.com?Subject=Request CAD for Part ID ',
      productQuantity: 1,
      CADDrawingTypes,
      isCadDownloading: false,
      isPDFDownloading: false,
      selectedDownloadFormat: null,
      desiredFormatOptions: DownloadFormats,
      ProductTypes
    }
  },
  computed: {
    curatedOptionsList () {
      let optionsList = this.partsList.map(part => ({
        PartID: part.partId,
        Quantity: parseInt(this.productQuantity),
        UnitPrice: parseFloat(part.unitPrice).toFixed(2)
      }))
      return optionsList
    },
    displayPrice () {
      let message = this.productDetails.ZeroDollarPricingMsg || 'Please Call for Pricing'
      return this.productDetails.UnitPrice !== 0 ? `$${this.productDetails.UnitPrice}` : message
    },
    shoppingCart () {
      return {
        CartID: -1,
        CartLineInfo: [
          {
          PartID: this.productDetails.PartID,
          Quantity: parseInt(this.productQuantity),
          UnitPrice: parseFloat(this.productDetails.UnitPrice),
          PartOptions: [
            ...this.curatedOptionsList
          ]
        }]
      }
    }
  },
  watch: {
    cadUser: {
      handler: function (cadUser) {
        if (cadUser.DownloadFormats !== '' || cadUser.DownloadFormats != null) {
          this.selectedDownloadFormat = cadUser.DownloadFormats
        }
      },
      deep: true
    }
  },
  methods: {
    onModifyPreferences () {
      this.$emit('display-cad-modal', true)
    },
    onDownloadCadClick () {
      const uri = `//${this.productDetails.CADVersionURL}`
      if (this.isValidCadUser) {
        if (this.productDetails.CADDrawingValue === CADDrawingTypes.Local) {
          this.isCadDownloading = true
          helpers.downloadFile(uri)
          setTimeout(() => {
            this.isCadDownloading = false
          }, 6000)
        }
      } else {
        this.$emit('display-cad-modal', true)
      }
    },
    onDownloadPDFClick () {
      this.isPDFDownloading = true
      let host = process.env.NODE_ENV === 'development' ? 'https://beta.hamiltoncaster.com' : ''
      let partId = this.productDetails.BasePartID
      let pdfUrl = '/DesktopModules/AcuitiSolutions/CatalogDetail/API/List/GetDataSheetPDF'
      let filePath = `${host}${pdfUrl}?partId=${partId}`

      let a = document.createElement('A');
      a.href = filePath;
      a.download = filePath.substr(filePath.lastIndexOf('/') + 1);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => {
        this.isPDFDownloading = false
      }, 6000)

    },
    addToProject () {
      let svc = this.$parent.moduleService[`svc-${this.$parent.moduleId}`]
      let antiForgeryList = document.getElementsByName("__RequestVerificationToken")
      let antiForgery = antiForgeryList[0].value

      addToCart(this.shoppingCart, svc, antiForgery)
      .then(res => {
        window.location.href = res
      })

    },
    onSearchParts () {
      this.setSessionStorage(ProductTypes.getKey(ProductTypes.Casters), this.selectedAttributes)
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
    goToResultsPage () {
      window.location.href = `${location.origin}/${ConfiguratorResultsPage}`
    },

  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  @import "../../assets/variables";

  .parts-details-header {

    h1 {
      small {
        display: block;
        font-size: 1.5rem;
      }
      &.mobile-title {
        margin-top: 1rem;
      }
    }
    .sub-head {
      font-size: 1.85rem;
      font-weight: 700;
      display: block;
      line-height: 2.5rem;

      small,
      .small {
        font-weight: normal;
        display: inline-block;
      }
      a {
        color: $primaryColor;
        text-decoration: underline;
      }
    }
    .product-description {
      margin: 1rem 0 .8rem;
      @media screen and (min-width: $medium) {
         max-width: 44rem;
      }
    }
    .product-summary {

      .download-cad {
        margin: .5rem 0 -1rem;
        align-items: center;
      }

      .price {
        margin: 2rem 0;
        .price-label {
          font-size: 1rem;
          font-weight: 700;
        }
        .price-value {
          font-size: 1rem;
        }
        .caption-wrap {
          display: block;

          .price-caption {
            margin: 0.6rem .5rem 0 0;
            font-size: 1.3rem;
            display: inline-block;
            color: $primaryColor;
            font-style: italic;
            font-weight: 700;
            border-bottom: 1px dotted $primaryColor;
            padding-bottom: 0.26rem;
            @media screen and (min-width: $medium) {
              font-size: 1.4rem;
            }
          }

          .pricing-info {
            display: inline-block;
            border-bottom: 1px dotted $primaryColor;
            color: $primaryColor;
          }
        }
      }

      .project {
        margin-top: .3rem;
      }
      .download-cad,
      .project {
        input, textarea {
          margin-bottom: 0;
          text-align: right;
          font-size: 1.25rem;
          width: 100%;
        }
        .button-wrap {
          display: flex;
          align-items: center;
        }

      }
    }
    .product-search-button {
      &.md-button {
        justify-self: flex-end;
        margin: 1rem 0 0;
        height: 2.45rem;
        padding: 0rem .625rem;
        @media screen and (min-width: $large) {
          margin: 2rem 0 1rem;
        }

        @media screen and (min-width: $x-large) {
          padding: 0rem 1.625rem;
        }

        .md-button-content {
          font-size: 1rem;
        }
      }
      &.disabled {
        opacity: .7;
        cursor: default;
      }
    }
  }
</style>
