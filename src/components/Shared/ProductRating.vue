<template>
  <div
    class="specs-table-item ratings"
    v-for="(rating, index) in ratings">
    <div
      class="col-md-6"
      :key="index">
      {{ rating.Name }}
    </div>
    <rating-blocks
      :key="index"
      class="col-md-6" :rating="parseFloat(rating.Value)" />
  </div>
</template>

<script>
  import RatingBlocks from './RatingBlocks'
  export default {
    name: "product-rating",
    components: {RatingBlocks},
    props: {
      ratings: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {}
    },
    methods: {

    },
    created () {

    },
    mounted () {

    }
  }
</script>

<style lang="scss">
  $grey: rgba(168,173,177,1);
  $padding: 15px;

  .ratings-border {
    border-color: $grey;
    display: block;
    margin-left: -$padding;
    margin-right: -$padding;
    padding-bottom: $padding;
    position: relative;
    top: $padding;
  }
  .specs-table-item.ratings ul {margin:0px !important;}
  .specs-table-item.ratings li{
    display: inline-block;
    width: 13px;
    height: 20px;
    background: rgba(168,173,177,1);
    margin: 5px 3px 0 0;
    padding: 0;
    background-image: none;
    list-style-type:square;
  }
  @media (min-width: 1200px) {
    .specs-table-item ul li {
      width: 13px !important;
      height: 20px !important;
      margin: 5px 3px 0 0 !important;
    }
  }
</style>
