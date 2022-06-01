import { observer } from 'mobx-react'
import { useStore } from 'stores'
import Chart from 'react-apexcharts'
import dayjs from 'dayjs'

const LineChart = observer(() => {
  const { coinsStore } = useStore()

  const categoriesList = coinsStore.chartData.map((el: any) => {
    const date = new Date(el.x).getTime()
    return dayjs(date).format('MMM DD HH:mm')
  })
  const dataList = coinsStore.chartData.map((el: any) => el.y[3])

  const state = {
    options: {
      chart: {
        id: 'line',
      },
      xaxis: {
        categories: categoriesList,
      },
    },
    series: [
      {
        name: 'series-1',
        data: dataList,
      },
    ],
  }

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          {/* @ts-ignore */}
          <Chart options={state.options} series={state.series} type="line" />
        </div>
      </div>
    </div>
  )
})

export default LineChart
