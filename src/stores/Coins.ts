import { makeAutoObservable, observable } from 'mobx'
import { api } from 'config'
import { CoinList, GraphData, ChartData } from 'types/Coins'

export class CoinsStore {
  @observable coinsList: CoinList[] = []
  @observable chartData: ChartData[] = []
  @observable chartName: string = ''
  @observable coinName: string = ''
  @observable period: number = 1

  constructor() {
    makeAutoObservable(this)
  }

  async getCoins(): Promise<any> {
    try {
      await api.get('coins/list').then(res => {
        const slicedRes = res.data.slice(2000, 2007)
        this.coinsList = slicedRes.map((el: CoinList) => {
          return { id: el.id, name: el.name }
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getOHLC(id: string) {
    try {
      await api.get(`coins/${id}/ohlc?vs_currency=usd&days=${this.period}`).then(res => {
        this.chartData = res.data.map((el: GraphData) => {
          return { x: new Date(el![0]), y: [el![1], el![2], el![3], el![4]] }
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  setPeriod(days: number) {
    this.period = days
  }

  setCoinName(id: string) {
    this.coinName = id
  }

  setChartName(name: string) {
    this.chartName = name
  }
}
