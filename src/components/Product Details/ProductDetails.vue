<template>
  <section class="product-details-wrapper">
    <spinner v-if="showSpinner" />
    <template
      v-else>
      <contact-modal
        :display-modal.sync="displayCADModal" />
      <section class="container product-header-wrapper">
        <product-header
          class="row"
          :product-details="productDetails"
          :parts-list="selectedPartsList"
          @display-cad-modal="displayCADModal = $event"/>
      </section>
      <!-- TODO: Bunch of other stuff goes here -->
      <section class="container-fluid">
        <part-options
          v-if="productDetails.PartOptions.length > 0"
          :product-id="productDetails.PartID"
          :selected-parts-list.sync="selectedPartsList"
          :part-options="productDetails.PartOptions" />
      </section>
      <div class="container">
        <div class="specifications">
          <product-specifications
            v-if="productDetails.Specifications != null"
            :wheel-image-url="productDetails.Wheel_ImageURL"
            :product-specifications="productDetails.Specifications" />
          <wheel-characteristics
            v-if="productDetails.WheelCharacteristics != null"
            :show-wheel-type-image="productDetails.Show_WheelTypeImage"
            :wheel-characteristics="productDetails.WheelCharacteristics" />
          <product-charts
            v-if="productDetails.ErgoProfile !== undefined && productDetails.ErgoProfile.length > 0"
            :chart-data="productDetails.ErgoProfile" />
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import { getDetailsAPI } from '../../api'
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
      displayCADModal: false,
      isMobile: true,
      partId: partIdQueryParam || 'W-315-D-1/2',
      productDetails: null,
      productTitle: '',
      showSpinner: true,
      selectedPartsList: []
    }
  },
  computed: {
  },
  methods: {
    getDetails () {
      getDetailsAPI(this.partId, this.detailLink)
      .then(res => {
        console.log('getDetails :: res', res)
        this.productDetails = res
        this.showSpinner = false
      })
    },
  },
  created () {
    this.moduleService[`svc-${this.moduleId}`] = this.svc
    this.getDetails()
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  @import "../../assets/variables";

  .product-details-wrapper {

    .specifications {
      display: block;

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

        > div {
          flex: 1 1 33%;
          padding: 1rem;
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


</style>
