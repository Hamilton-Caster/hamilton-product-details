<template>
  <ul class="rating-blocks" :title="rating">
    <li
      v-for="(block, index) in blocks"
      :key="index"
      :class="block"></li>
  </ul>
</template>

<script>
  export default {
    name: "rating-blocks",
    props: {
      rating: {
        type: Number,
        default: 0
      }
    },
    data: () => ({
      blocks: []
    }),
    methods: {
      calculateRating () {
        let blocks = []
        let maxAmount = 5
        let remaining = this.rating

        for (let i = 0; i < maxAmount; i ++) {
          if (remaining >= 1) {
            blocks.push('full')
            --remaining
          } else if (remaining > 0) {
            blocks.push('half')
            --remaining
          } else {
            blocks.push('none')
          }
        }
        return blocks
      }
    },
    created () {
      this.blocks = this.calculateRating()
    }
  }
</script>

<style lang="scss">
  $ratingRed: rgba(215,32,39,1);
  $ratingGrey: rgba(168,173,177,1);
  $ratingGradient: linear-gradient(to right, rgba(215,32,39,1), rgba(168,173,177,1) 70%) !important;


    .specs-table-item {
      &.ratings {
        li {
          padding: 0;
          &.full { background-color: $ratingRed !important;}
          &.half {
            background-image: $ratingGradient;
            background-position: 0 1px;
            background-size: 12px 19px;
          }
          &.none { background-color: $ratingGrey !important;}
        }
      }
    }
</style>
