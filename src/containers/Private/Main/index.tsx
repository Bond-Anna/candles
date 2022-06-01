import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useStore } from 'stores'
import { Button } from 'antd'
import AsideComponent from './Aside'
import ApexChart from './Chart/candle'
import LineChart from './Chart/line'
// style
import styles from './styles.module.scss'

const Main: React.FC = observer(() => {
  const { coinsStore } = useStore()

  const [type, setType] = useState('candle')

  useEffect(() => {
    coinsStore.getCoins()
  }, [])

  const handleGraphBtnClick = (e: any) => {
    setType(e.currentTarget.innerText.toLowerCase())
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
          <div className={styles.graphHeader}>
            <p className={styles.chartName}>{coinsStore.chartName} - USD</p>
            <div className={styles.blockBtn}>
              <Button
                type="primary"
                className={styles.primaryBtn}
                onClick={e => handleGraphBtnClick(e)}
              >
                Candle
              </Button>
              <Button className={styles.secondBtn} onClick={e => handleGraphBtnClick(e)}>
                Line
              </Button>
            </div>
            <div className={styles.blockBtn}>
              <Button type="primary" className={styles.primaryBtn}>
                1d
              </Button>
              <Button className={styles.secondBtn}>3d</Button>
              <Button className={styles.secondBtn}>7d</Button>
              <Button className={styles.secondBtn}>14d</Button>
              <Button className={styles.secondBtn}>1m</Button>
            </div>
          </div>
          {type === 'candle' && <ApexChart />}
          {type === 'line' && <LineChart />}
        </div>
      </div>
    </div>
  )
})

export default Main
