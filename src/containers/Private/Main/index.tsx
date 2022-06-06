import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useStore } from 'stores'
import { Button } from 'antd'
import AsideComponent from './Aside'
import ApexChart from './Chart/candle'
import LineChart from './Chart/line'
// style
import styles from './styles.module.scss'

const btns = [
  { id: '0', days: 1 },
  { id: '1', days: 7 },
  { id: '2', days: 14 },
  { id: '3', days: 30 },
]

const Main: React.FC = observer(() => {
  const { coinsStore } = useStore()

  const [graphType, setGraphType] = useState<String>('candle')

  useEffect(() => {
    coinsStore.getCoins()
  }, [])

  const handleGraphBtnClick = (e: any) => {
    setGraphType(e.currentTarget.innerText.toLowerCase())
  }

  const handleGraphDaysBtnClick = (days: number) => {
    coinsStore.period = days
    coinsStore.getOHLC(coinsStore.coinName)
  }

  return (
    <div className={styles.container}>
      <AsideComponent />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <ul className={styles.menu}>
            <li>Exchange</li>
            <li>Dashboard</li>
            <li>Balances</li>
            <li>Wallet</li>
          </ul>
          <div className={styles.logIn}>log in</div>
        </header>
        <div className={styles.mainBlock}>
          {coinsStore.chartName === '' ? (
            <h1>Please select one of pairs</h1>
          ) : (
            <>
              <div className={styles.graphHeader}>
                <p className={styles.chartName}>{coinsStore.chartName} - USD</p>
                <div className={styles.blockBtn}>
                  <Button
                    type={graphType === 'candle' ? 'primary' : 'default'}
                    onClick={e => handleGraphBtnClick(e)}
                  >
                    Candle
                  </Button>
                  <Button
                    type={graphType === 'line' ? 'primary' : 'default'}
                    onClick={e => handleGraphBtnClick(e)}
                  >
                    Line
                  </Button>
                </div>
                <div className={styles.blockBtn}>
                  {btns.map((btn, idx) => (
                    <Button
                      type={coinsStore.period === btn.days ? 'primary' : undefined}
                      className={styles.primaryBtn}
                      key={btn.id}
                      onClick={() => {
                        handleGraphDaysBtnClick(btn.days)
                      }}
                    >
                      {btn.days}d
                    </Button>
                  ))}
                </div>
              </div>
              {graphType === 'candle' && <ApexChart />}
              {graphType === 'line' && <LineChart />}
            </>
          )}
        </div>
      </div>
    </div>
  )
})

export default Main
