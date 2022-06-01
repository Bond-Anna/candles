import React from 'react'
import { useStore } from 'stores'
import dayjs from 'dayjs'
import Chart from 'react-apexcharts'
import { observer } from 'mobx-react-lite'

const ApexChart = observer(() => {
  const { coinsStore } = useStore()

  const state = {
    series: [
      {
        name: 'candle',
        data: coinsStore.chartData,
      },
    ],
    options: {
      chart: {
        height: '100%',
        type: 'candlestick',
      },
      tooltip: {
        enabled: true,
      },
      xaxis: {
        type: 'category',
        labels: {
          formatter: function (val: any) {
            return dayjs(val).format('MMM DD HH:mm')
          },
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  }

  return (
    <div id="chart">
      <Chart
        // @ts-ignore
        options={state.options}
        // @ts-ignore
        series={state.series}
        type="candlestick"
      />
    </div>
  )
})

export default ApexChart
