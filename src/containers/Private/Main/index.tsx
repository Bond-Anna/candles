import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useStore } from 'stores'
import { Button } from 'antd'
import AsideComponent from './Aside'
import ApexChart from './Chart/Candle'
import LineChart from './Chart/Line'
import Logo from './Logo'
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

  const [graphType, setGraphType] = useState<string>('candle')

  useEffect(() => {
    coinsStore.getCoins()
  }, [])

  const handleGraphDaysBtnClick = (days: number) => {
    coinsStore.setPeriod(days)
    coinsStore.getOHLC(coinsStore.coinName)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Logo />
          <ul className={styles.menu}>
            <li>Exchange</li>
            <li>Dashboard</li>
            <li>Balances</li>
            <li>Wallet</li>
          </ul>
          <div className={styles.logIn}>log in</div>
        </header>
        <div className={styles.mainBlock}>
          <AsideComponent />
          {!coinsStore.chartName ? (
            <h1>Please select one of pairs</h1>
          ) : (
            <div className={styles.graphBlock}>
              <div className={styles.graphHeader}>
                <p className={styles.chartName}>{coinsStore.chartName} - USD</p>
                <div className={styles.blockBtn}>
                  <Button
                    type={graphType === 'candle' ? 'primary' : 'default'}
                    onClick={() => setGraphType('candle')}
                  >
                    Candle
                  </Button>
                  <Button
                    type={graphType === 'line' ? 'primary' : 'default'}
                    onClick={() => setGraphType('line')}
                  >
                    Line
                  </Button>
                </div>
                <div className={styles.blockBtn}>
                  {btns.map(btn => (
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default Main
