<template>
  <header class="parts-details-header">
    <product-image
      class="col-md-6"
      :product-details="productDetails" />
    <div class="product-summary col-md-6">
      <h1>
        <small>Part Details for</small>
        <span v-html="productDetails.BasePartID"></span>
      </h1>
      <span class="sub-head">
        Load Capacity (lbs.): <small>{{ productDetails.LoadCapacity }}</small>
      </span>
      <span class="sub-head">
        Availability: <small>{{ productDetails.Availability }}</small>
      </span>
      <p class="product-description">
        <span v-html="productDetails.Description"></span>
      </p>
      <md-button
        v-if="productDetails.CADVersionAvailable"
        class="md-primary"
        @click="onDownloadCadClick">
        <font-awesome-icon :icon="['fas', 'download']" />
        Download CAD (step file)
      </md-button>
      <md-button
        v-if="productDetails.HasLocalCADFile"
        class="md-primary"
        @click="onDownloadCadClick">
        <font-awesome-icon :icon="['fas', 'download']" />
        Download CAD
      </md-button>
      <md-button
        class="md-primary"
        :href="emailLink + productDetails.BasePartID">
        <font-awesome-icon :icon="['fas', 'paper-plane']" />
        Request CAD Format
      </md-button>
      <md-button
        v-if="productDetails.IsValidPart"
        class="md-primary"
        @click="onDownloadPDFClick">
        <font-awesome-icon :icon="['fas', 'file-pdf']" />
        PDF Datasheet
      </md-button>
      <div class="price">
        <span class="price-label">{{ productDetails.UnitPriceLabel }}</span>
        <span class="price-value"> ${{ productDetails.UnitPrice }}</span>
        <span>
          <span class="price-caption">{{ productDetails.PricingCaption}}</span>
          <md-tooltip
            class="info-popopver"
            md-direction="top">
            <div class="inner-popover">
              <span
                class="popover-description"
                v-html="productDetails.PricingMessage"></span>
            </div>
          </md-tooltip>
          <font-awesome-icon
            class="pricing-info-icon"
            :icon="['fas', 'info-circle']" />
        </span>
      </div>
      <div
        v-if="!productDetails.IsObsoletePart"
        class="project md-layout md-gutter">
        <div class="md-layout-item md-small-size-50 md-size-25">
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
        <div class="md-layout-item md-small-size-50 md-size-25 button-wrap">
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
export default {
  name: 'product-header',
  components: {ProductImage},
  props: {
    productDetails: {
      type: Object,
      required: true
    },
    partsList: {
      type: Array
    }
  },
  data () {
    return {
      emailLink: 'mailto:cad@hamiltoncaster.com?Subject=Request CAD for Part ID ',
      productQuantity: 1,
    }
  },
  methods: {
    onDownloadCadClick () {
      const uri = this.productDetails.CADVersionURL
      //console.log(uri);
      // let form = document.createElement("form");
      // form.setAttribute('action', uri)
      // document.body.appendChild(form)
      // form.submit()
      // document.body.removeChild(document.body.lastElementChild)

      this.$emit('display-cad-modal', true)
    },
    onOtherFormatClick () {
    },
    onDownloadPDFClick () {
      let host = window.location.host.includes('dev.') ? 'https://beta.hamiltoncaster.com' : ''

      let partid = this.productDetails.BasePartID
      let pdfUrl = '/DesktopModules/AcuitiSolutions/CatalogDetail/API/List/GetDataSheetPDF'
      let filePath = `${host}${pdfUrl}?partid=${partid}`

      let a = document.createElement('A');
      a.href = filePath;
      a.download = filePath.substr(filePath.lastIndexOf('/') + 1);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    addToProject () {
      alert('do stuff with this')
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
    }
    a.md-button.md-theme-default,
    button.md-button.md-theme-default {
      background: $primaryColor;
      border: none;
      color: $white;
      border-radius: none;
      display: inline-block;
      padding: 0.625rem;

      .md-button-content {
        font-size: 0.875rem;
        font-weight: 700;
        text-transform: none;
      }

      &:first-of-type {
        margin-left: 0;
      }
    }
    .product-summary {

      .price {
        margin-top: 2rem;
        .price-label {
          font-size: 1.5rem;
          font-weight: 700;
        }
        .price-value {
          font-size: 1.5rem;
        }
        .price-caption {
          font-style: italic;
          margin: 0 .25rem 0 1rem;
        }
        .pricing-info-icon {
          color: $primaryColor;
        }
      }

      .project {
        margin-top: 1.5rem;
        input, textarea {
          margin-bottom: 0;
        }
        .button-wrap {
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
