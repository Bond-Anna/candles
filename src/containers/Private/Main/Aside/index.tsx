import { FC, useState } from 'react'
import { observer } from 'mobx-react'
import { useStore } from 'stores'
import cn from 'classnames'
import styles from './styles.module.scss'

const AsideComponent: FC = observer(() => {
  const { coinsStore } = useStore()
  const [pairIdx, setPairIdx] = useState<number>()

  const handleClick = (id: string, name: string, idx: number) => {
    coinsStore.getOHLC(id)
    coinsStore.setCoinName(id)
    coinsStore.setChartName(name)
    setPairIdx(idx)
  }

  return (
    <aside className={styles.sidebar}>
      <p className={styles.title}>Popular pairs</p>
      <ul className={styles.pairsList}>
        {coinsStore.coinsList.map((coin, idx) => (
          <li
            key={coin.id}
            role="button"
            className={cn(styles.pair, { [styles.active]: pairIdx === idx })}
            onClick={() => handleClick(`${coin.id}`, `${coin.name}`, idx)}
          >
            {coin.name} - USD
          </li>
        ))}
      </ul>
    </aside>
  )
})

export default AsideComponent
