<template>
  <md-empty-state
    v-if="error != null">
    <font-awesome-icon class="md-empty-state-icon" :icon="['fad', 'face-sad-tear']" />
    <strong class="md-empty-state-label">An error has occurred</strong>
    <p class="md-empty-state-description">
      <span>{{ error }}</span><br>Please try again later
    </p>
    <md-button
      @click="goHome"
      class="md-raised">
      Go Hamilton Home Page
    </md-button>
  </md-empty-state>
  <md-empty-state
    v-else-if="dataLoaded && !productDetails.IsValidPart">
    <font-awesome-icon class="md-empty-state-icon" :icon="['fad', 'face-sad-tear']" />
    <strong class="md-empty-state-label">Part Not Found</strong>
    <p class="md-empty-state-description">
      The part you are looking is not here. You can use the Product Finder to search all parts.
    </p>
    <md-button
      @click="goToProductFinder"
      class="md-raised">
      Go To Product Finder
    </md-button>
  </md-empty-state>
  <section
    v-else
    class="product-details-wrapper">
    <spinner class="product-details-spinner" :show-spinner="showSpinner" />
    <template
      v-if="!showSpinner">
      <contact-modal
        :cad-user.sync="cadUser"
        :display-modal.sync="displayCADModal"
        @registration-confirmed="onRegistrationConfirmed"/>
      <section class="container product-header-wrapper">
        <product-header
          ref="productHeader"
          class="row"
          :cad-user="cadUser"
          :product-details="productDetails"
          :parts-list="selectedPartsList"
          :is-valid-cad-user="isValidCadUser"
          :product-type="productDetails.ProductType"
          :selected-attributes="selectedAttrs"
          :is-search-disabled="searchDisabled"
          :has-product-config-attributes="productDetails.HasProductConfigAttributes"
          @display-cad-modal="displayCADModal = $event" />
      </section>
      <!-- TODO: Bunch of other stuff goes here -->
      <section class="container-fluid part-options-section">
        <part-options
          v-if="productDetails.PartOptions.length > 0"
          :product-id="productDetails.PartID"
          :selected-parts-list.sync="selectedPartsList"
          :part-options="productDetails.PartOptions" />
      </section>
      <div class="container">
        <div
          class="specifications"
          :class="{'has-charts': hasCharts}">
          <product-specifications
            v-if="productDetails.Specifications != null"
            :has-product-config-attributes="productDetails.HasProductConfigAttributes"
            :product-type="productDetails.ProductType"
            :wheel-image-url="productDetails.Wheel_ImageURL"
            :product-specifications="productDetails.Specifications"
            :search-disabled.sync="searchDisabled"
            :selected-attrs.sync="selectedAttrs"/>
          <wheel-characteristics
            v-if="productDetails.WheelCharacteristics != null"
            :show-wheel-type-image="productDetails.Show_WheelTypeImage"
            :wheel-characteristics="productDetails.WheelCharacteristics" />
          <product-charts
            v-if="hasCharts"
            :chart-data="productDetails.ErgoProfile" />
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import { getDetailsAPI, getIsValidCADUser} from '../../api'
import Spinner from '../Utilities/Spinner'
import ProductHeader from './ProductHeader'
import ProductCharts from './ProductCharts'
import ProductSpecifications from './ProductSpecifications'
import WheelCharacteristics from './WheelCharacteristics'
import ContactModal from './ContactModal'
import PartOptions from './PartOptions'

const href = window.location.href

const urlParams = new URLSearchParams(window.location.search)
// Check for both variations of part Id in query param
const partIdQueryParam = urlParams.get('PartId') || urlParams.get('PartID')
// Check for both variations of part Id in URL
const partIdUrlParam = href.split('PartID/')[1] || href.split('PartId/')[1]

export default {
  name: 'product-details',
  components: {
    PartOptions,
    ContactModal,
    WheelCharacteristics,
    ProductSpecifications,
    ProductCharts,
    ProductHeader,
    Spinner
  },
  props: { },
  data () {
    return {
      // DNN Module services
      svc: {
        moduleId: this.$attrs['module-id'],
        path: 'AcuitiSolutions/CatalogDetail',
        controller: 'ItemController'
      },
      antiForgery: null,
      moduleService: {},
      // Component Items
      dataLoaded: false,
      displayCADModal: false,
      isMobile: true,
      cadUser: {
        Address: null,
        CADUserID: 0,
        City: null,
        Company: null,
        DownloadFormats: null,
        Email: null,
        FullName: null,
        IsValidCADUser: false,
        Phone: null,
        State: null,
        Zipcode: null
      },
      partId: partIdUrlParam || partIdQueryParam, // check for query param or url param
      productDetails: null,
      productTitle: '',
      searchDisabled: true,
      selectedAttrs: [],
      showSpinner: true,
      selectedPartsList: [],
      error: null
    }
  },
  computed: {
    isValidCadUser () {
      return this.cadUser.IsValidCADUser
    },
    hasCharts () {
      return this.productDetails.ErgoProfile !== undefined && this.productDetails.ErgoProfile.length > 0
    }
  },
  methods: {
    getDetails () {
      getDetailsAPI(this.partId, this.detailLink)
      .then(res => {
        this.productDetails = res
        this.showSpinner = false
        this.dataLoaded = true
      })
      .catch(err => this.error = err)
    },
    validateUser () {
      getIsValidCADUser()
      .then(res => {
        this.cadUser = res
      })
    },
    goToProductFinder () {
      window.location.href = '/Configurator-Search-Results'
    },
    goHome () {
      window.location.href = '/'
    },
    onRegistrationConfirmed () {
      this.$refs.productHeader.onDownloadCadClick()
    }
  },
  created () {
    this.moduleService[`svc-${this.moduleId}`] = this.svc
    this.getDetails()
  },
  mounted () {
    this.validateUser()
  }
}
</script>

<style lang="scss">
  @import "../../assets/variables";
  .md-empty-state-label {
    margin-top: 2rem;
    font-size: 2.5rem;
  }
  .product-details-wrapper {
    min-height: 50rem;

    .specifications {
      display: block;
      --columnWidth: 50%;
      --flex-grow: 0;
      &.has-charts {
        --columnWidth: 33%;
        --flex-grow: 1;
      }

      > div {
        > h2 {
          margin-bottom: 1rem;
        }
      }

      @media screen and (min-width: $large) {
        display: flex;
        flex-direction: row;
        margin: 2rem 0;
        flex-wrap: wrap;
        justify-content: center;
        --flex-grow: 0;

        > div {
          flex: var(--flex-grow) 1 var(--columnWidth);
          min-width: 32rem;
          padding: 1rem;
          @media screen and (max-width: $xx-large) {
            &.product-charts {
              flex: 2 2 var(--columnWidth);
              //min-width: 34rem;
            }
          }

        }
      }
      @media screen and (min-width: $x-large) {
        --columnWidth: 40%;
        &.has-charts {
          --columnWidth: 33%;
        }
      }
      @media screen and (min-width: $xx-large) {
        flex-wrap: nowrap;
      }
    }
  }

  .product-header-wrapper {
    margin-bottom: 1rem;
  }

  .hide-mobile {
    @media screen and (max-width: $medium) {
      display: none !important;
    }
  }
  .hide-desktop {
    @media screen and (min-width: $medium) {
      display: none !important;
    }
  }

  .part-options-section {
    &.container-fluid {
      @media screen and (min-width: $xxx-large) {
        padding: 0 1rem;
      }
    }
  }

  .product-details-spinner {
    min-height: 25rem;
  }

  .note-block {
    padding: .825rem;
    background: $lightGreyBg;
    color: $primaryColor;
    border: 1px solid lightGrey;
    border-left: 4px solid $warning;

    &.error {
      border-left: 4px solid $warning;
      color: $primaryColor;
    }
    &.success {
      border-left: 4px solid $success;
      color: $successText;
    }
  }

  a.md-button.md-theme-default,
  button.md-button.md-theme-default {
    &.md-outline {
      color: $primaryColor;
      border: 1px solid $primaryColor;
      &:hover {
        background-color: transparent;
        text-decoration: none;
      }
    }

    &.md-primary {
      background: $primaryColor;
      color: $white;
    }

    border: none;
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

  .md-theme-default {
    .breadcrumb li a {
      &:not(.md-button) {
        color: $white;
      }
    }
  }
</style>
