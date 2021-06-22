<template>
  <div>
    <h2>Product Details Module</h2>
    <p>{{ productDetailsDescription}}</p>
  </div>
</template>

<script>
import { getDetailsAPI } from '../../api'
import utilities from '../../utilities/helpers'
import Spinner from '../Utilities/Spinner'

export default {
  name: 'product-details',
  components: {
    Spinner
  },
  props: {},
  data () {
    return {
      // DNN Module services
      svc: {
        moduleId: this.moduleId,
        path: 'AcuitiSolutions/CatalogDetail',
        controller: 'ItemController'
      },
      antiForgery: null,
      moduleService: {},
      // Component Items
      isMobile: true,
      showSpinner: true,
      productDetailsDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, hic, similique? Alias, animi aspernatur dicta, dolorem eaque enim eos id iure nemo nisi omnis optio porro praesentium quod sit vel.',
      productTitle: ''
    }
  },
  computed: {
  },
  methods: {
    getDetails () {
      getDetailsAPI(this.commodityId, this.detailLink)
      .then(res => {
        console.log('getDetails :: res', res)
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



</style>
