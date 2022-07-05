import { FC } from 'react'
import { useStore } from 'stores'
import { observer } from 'mobx-react-lite'
import dayjs from 'dayjs'
import Chart from 'react-apexcharts'

const ApexChart: FC = observer(() => {
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
    <div id="chart" style={{ height: 'calc(100% - 100px)' }}>
      <Chart
        // @ts-ignore
        options={state.options}
        // @ts-ignore
        series={state.series}
        type="candlestick"
        height={'100%'}
      />
    </div>
  )
})

export default ApexChart
