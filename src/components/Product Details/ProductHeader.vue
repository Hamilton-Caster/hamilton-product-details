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
      <span class="sub-head">
        Availability: <small>{{ productDetails.Availability }}</small>
      </span>
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
      <span class="sub-head hide-mobile">
        Availability: <small>{{ productDetails.Availability }}</small>
      </span>
      <p class="product-description">
        <span v-html="productDetails.Description"></span>
      </p>
      <md-button
        v-if="productDetails.CADDrawingValue === CADDrawingTypes.Local && productDetails.CADVersionAvailable"
        class="md-outline"
        @click="onDownloadCadClick">
        <font-awesome-icon :icon="['fas', 'download']" />
        Download CAD
      </md-button>
      <md-button
        id="lbCAD"
        class="md-outline"
        :href="emailLink + productDetails.BasePartID">
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
        Request CAD Format
      </md-button>
      <md-button
        v-if="productDetails.IsValidPart"
        class="md-outline"
        @click="onDownloadPDFClick">
        <font-awesome-icon :icon="['fas', 'file-pdf']" />
        PDF Datasheet
      </md-button>
      <md-button
        v-if="isValidCadUser"
        class="md-outline"
        @click="onModifyPreferences">
        <font-awesome-icon :icon="['fas', 'cog']" />
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
    </div>
  </header>
</template>

<script>
import ProductImage from './ProductImage'
import { addToCart } from '../../api'
import {CADDrawingTypes, DownloadFormats} from '../enums'
import helpers from '../../utilities/helpers'

let cdsViewer = cds

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
    isValidCadUser: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      emailLink: 'mailto:cad@hamiltoncaster.com?Subject=Request CAD for Part ID ',
      productQuantity: 1,
      CADDrawingTypes,
      selectedDownloadFormat: null,
      desiredFormatOptions: DownloadFormats
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
        console.log('handler :: cadUser.DownloadFormats', cadUser.DownloadFormats)
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
      console.log('onDownloadCadClick :: uri', uri)
      if (this.isValidCadUser) {
        if (this.productDetails.CADDrawingValue === CADDrawingTypes.Local) {
          helpers.downloadFile(uri)
        }
      } else {
        this.$emit('display-cad-modal', true)
      }
    },
    onDownloadPDFClick () {
      let host = process.env.NODE_ENV === 'development' ? 'https://beta.hamiltoncaster.com' : ''
      let partId = this.productDetails.BasePartID
      let pdfUrl = '/DesktopModules/AcuitiSolutions/CatalogDetail/API/List/GetDataSheetPDF'
      let filePath = `${host}${pdfUrl}?partId=${partId}`
      console.log('onDownloadPDFClick :: filePath', filePath)

      let a = document.createElement('A');
      a.href = filePath;
      a.download = filePath.substr(filePath.lastIndexOf('/') + 1);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    addToProject () {
      let svc = this.$parent.moduleService[`svc-${this.$parent.moduleId}`]
      let antiForgeryList = document.getElementsByName("__RequestVerificationToken")
      let antiForgery = antiForgeryList[0].value

      addToCart(this.shoppingCart, svc, antiForgery)
      .then(res => {
        window.location.href = res
      })

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

      small {
        font-weight: normal;
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
  }
</style>
