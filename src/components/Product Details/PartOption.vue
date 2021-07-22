<template>
  <li class="part-option">
    <img
      class="option-image"
      :src="partOption.ImageUrl"
      :alt="partOption.Description">
    <h3 v-html="partOption.Description">
    </h3>
    <div>
      <span class="price-label">{{ partOption.UnitPriceLabel }}</span>
      <span class="price-value"> ${{ partOption.UnitPrice }}</span>
    </div>
    <div
      v-if="partOption.Availability">
      Availability: <span v-html="partOption.Availability"></span>
    </div>
    <div
      v-if="partOption.UnitPrice != null"
      class="project md-layout md-gutter">
      <div class="md-layout-item md-small-size-50 md-size-25">
        <md-field>
          <md-checkbox
            v-model="isSelected"
            @change="onChange">
            Include with {{ productId }}
          </md-checkbox>
        </md-field>
      </div>
    </div>

  </li>
</template>

<script>
export default {
  name: 'part-option',
  props: {
    partOption: {
      type: Object,
      default: () => {}
    },
    selectedPartOptions: {
      type: Array
    },
    productId: {
      type: String
    }
  },
  data () {
    return {
      isSelected: null
    }
  },
  methods: {
    onChange (e) {
      console.log('onChange :: e', e)
      let partOptionsList = [...this.selectedPartOptions]
      if (this.isSelected) {
        partOptionsList.push(this.partOption.PartID)
      } else {
        partOptionsList = partOptionsList.filter(option => option !== this.partOption.PartID)
      }
      this.$emit('update:selected-part-options', partOptionsList)
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
  .price-value {
    font-size: 1.5rem;
  }
  .price-caption {
    font-style: italic;
    margin: 0 .25rem 0 1rem;
  }
</style>
