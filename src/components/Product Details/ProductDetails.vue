<template>
  <md-empty-state
    v-if="dataLoaded && !productDetails.IsValidPart">
    <font-awesome-icon class="md-empty-state-icon" :icon="['fad', 'sad-tear']" />
    <strong class="md-empty-state-label">Part Not Found</strong>
    <p class="md-empty-state-description">The part you are looking is not here. You can use the Product Finder to search all parts.</p>
    <md-button
      @click="goToProductFinder"
      class="md-raised">Go To Product Finder</md-button>
  </md-empty-state>
  <section
    v-else
    class="product-details-wrapper">
    <spinner class="product-details-spinner" :show-spinner="showSpinner" />
    <template
      v-if="!showSpinner">
      <contact-modal
        :cad-user.sync="cadUser"
        :display-modal.sync="displayCADModal" />
      <section class="container product-header-wrapper">
        <product-header
          class="row"
          :cad-user="cadUser"
          :product-details="productDetails"
          :parts-list="selectedPartsList"
          :is-valid-cad-user="isValidCadUser"
          @display-cad-modal="displayCADModal = $event"/>
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
            :product-specifications="productDetails.Specifications" />
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
import utilities from '../../utilities/helpers'
import Spinner from '../Utilities/Spinner'
import ProductHeader from './ProductHeader'
import ProductCharts from './ProductCharts'
import ProductSpecifications from './ProductSpecifications'
import WheelCharacteristics from './WheelCharacteristics'
import ContactModal from './ContactModal'
import PartOptions from './PartOptions'

const urlParams = new URLSearchParams(window.location.search)
const partIdQueryParam = urlParams.get('PartId')

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
      partId: partIdQueryParam,
      productDetails: null,
      productTitle: '',
      showSpinner: true,
      selectedPartsList: []
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
    },
    validateUser () {
      getIsValidCADUser()
      .then(res => {
        this.cadUser = res
      })
    },
    goToProductFinder () {
      window.location.href = '/Configurator-Search-Results'
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

        > div {
          flex: var(--flex-grow) 1 var(--columnWidth);
          //min-width: 32rem;
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
        --columnWidth: 33%;
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
</style>
