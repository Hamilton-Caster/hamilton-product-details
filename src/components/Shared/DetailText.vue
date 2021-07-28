<template functional>
  <div class="specs-table-item row">
    <div
      class="col-md-6">
      <span
        v-html="props.Name"></span>
      <template
        v-if="props.HasToolTip && props.Type !== 'Link'">
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
    <div
      v-if="props.Type === 'Link'"
      class="col-md-6">
      <a :href="props.Value">
        <span v-html="props.ToolTipValue"></span>
      </a>
    </div>
    <div
      v-else
      class="col-md-6"
      v-html="props.Value"></div>
  </div>
</template>

<script>

  export default {
    name: "detail-text",
    data: () => ({

    })
  }
</script>

<style lang="scss">
  @import "../../assets/variables";

  .md-theme-default {
    .specs-table-item {
      a:not(.md-button) {
        span {
          color: $primaryColor;
          text-decoration: underline;
        }
      }
    }
  }
</style>
