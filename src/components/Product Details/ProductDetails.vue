<template>
  <section class="container">
    <spinner v-if="showSpinner" />
    <template
      v-else>
      <contact-modal
        :display-modal.sync="displayCADModal" />
      <product-header
        class="row"
        :product-details="productDetails"
        @display-cad-modal="displayCADModal = $event"/>
      <!-- TODO: Bunch of other stuff goes here -->
      <part-options
        :product-id="productDetails.PartID"
        :selected-parts-list.sync="selectedPartsList"
        :part-options="productDetails.PartOptions" />
      <div class="specifications">
        <product-specifications
          v-if="productDetails.Specifications != null"
          :product-specifications="productDetails.Specifications" />
        <wheel-characteristics
          v-if="productDetails.WheelCharacteristics != null"
          :wheel-characteristics="productDetails.WheelCharacteristics" />
        <product-charts
          v-if="productDetails.ErgoProfile !== undefined && productDetails.ErgoProfile.length > 0"
          :chart-data="productDetails.ErgoProfile" />
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

  .specifications {
    @media screen and (min-width: $medium) {
      display: flex;
      flex-direction: row;
      margin: 0 -1rem;

      > div {
        flex: 1;
        padding: 1rem;
      }
    }
  }

</style>
