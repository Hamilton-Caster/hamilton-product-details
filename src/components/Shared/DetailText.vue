<template functional>
  <div class="specs-table-item row">
    <div
      class="col-md-6">
      <span
        v-html="props.Name"></span>
      <template
        v-if="props.HasToolTip">
        <md-tooltip
          class="info-popopver"
          md-direction="top">
          <div class="inner-popover">
            <span
              class="popover-description"
              v-html="props.ToolTipValue"></span>
          </div>
        </md-tooltip>
        <font-awesome-icon
          class="spec-info-icon"
          v-if="props.HasToolTip"
          :icon="['fas', 'info-circle']" />
      </template>
    </div>
    <div class="col-md-6" v-html="props.Value"></div>
  </div>
</template>

<script>

  export default {
    name: "detail-text",
    data: () => ({

    })
  }
</script>

<style scoped lang="scss">

</style>
