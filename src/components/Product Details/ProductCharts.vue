<template>
  <div class="product-charts">
    <h2>Ergonomic Specifications</h2>
    <small>Data available for wheels intended for manual operation: wheels 2” in width. For data of other wheel widths, consult factory.
    </small>
    <chart-item
      v-for="form in formattedChartData"
      :key="form.SeriesID"
      :form-data="form" />
  </div>
</template>

<script>
import utilities from '../../utilities/helpers'
import ChartItem from './ChartItem'

const colorsArray = ['#008000', '#d92129', '#232323', '#ffa500']

export default {
  name: 'product-charts',
  components: { ChartItem },
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      formattedChartData: []
    }
  },
  methods: {
    formatChartData () {
      this.chartData.sort(utilities.dynamicSort('DisplayOrder'))
      this.formattedChartData = this.chartData.map(chart => ({
        title: {
          text: chart.SeriesName
        },
        yAxis: {
          title: {
            text: chart.YAxisLabel
          },
          max: this.getXMaxValue(chart.ErgoCharacteristics, 'YAxisValue', 0),
          pointStart: 0
        },
        xAxis: {
          title: {
            text: chart.XAxisLabel
          },
          min: 0,
          max: this.getXMaxValue(chart.ErgoCharacteristics, 'XAxisValue', 100),
          pointInterval: 50
        },
        series: [{
          type: 'area',
          name: chart.XAxisLabel,
          data: chart.ErgoCharacteristics.map(point => ([point.XAxisValue, point.YAxisValue])),
          showInLegend: false,
          color: colorsArray[chart.DisplayOrder - 1],
          fillOpacity: .2
        }],
        tooltip: {
          formatter: function() {
            return `<b>${chart.YAxisLabel}: </b> ${this.y}<br /><b>${chart.XAxisLabel}: </b> ${this.x}`
          }
        },
        credits: {
          enabled: false
        }
      }))
    },
    getXMaxValue (ErgoCharacteristics, propName, padValue = 0) {
      return Math.max.apply(Math, ErgoCharacteristics.map(function(item) { return item[propName] })) + padValue
    }
  },
  created () {

  },
  mounted () {
    this.formatChartData()
  }
}
</script>

<style lang="scss">

</style>
