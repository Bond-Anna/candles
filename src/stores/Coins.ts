import { makeAutoObservable, observable } from 'mobx'
import { api } from 'config'

export class CoinsStore {
  @observable coinsList = []
  @observable chartData = []
  @observable chartName = ''

  constructor() {
    makeAutoObservable(this)
  }

  async getCoins(): Promise<any> {
    try {
      await api.get('coins/list').then(res => {
        const slicedRes = res.data.slice(2000, 2007)
        this.coinsList = slicedRes.map((el: any) => {
          return { id: el.id, name: el.name }
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getOHLC(id: string) {
    try {
      await api.get(`coins/${id}/ohlc?vs_currency=usd&days=1`).then(res => {
        this.chartData = res.data.map((el: any) => {
          return { x: new Date(el[0]), y: [el[1], el[2], el[3], el[4]] }
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}
