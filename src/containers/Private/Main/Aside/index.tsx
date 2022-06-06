import { FC } from 'react'
import { observer } from 'mobx-react'
import { useStore } from 'stores'
import Logo from '../logo'
import styles from './styles.module.scss'

const AsideComponent: FC = observer(() => {
  const { coinsStore } = useStore()

  const handleClick = (id: string, name: string) => {
    coinsStore.getOHLC(id)
    coinsStore.coinName = id
    coinsStore.chartName = name
  }

  return (
    <aside className={styles.sidebar}>
      <Logo />
      <p className={styles.title}>Popular pairs</p>
      <ul className={styles.pairsList}>
        {coinsStore.coinsList.map(coin => (
          <li
            key={coin.id}
            role="button"
            className={styles.pair}
            onClick={() => handleClick(`${coin.id}`, `${coin.name}`)}
          >
            {coin.name} - USD
          </li>
        ))}
      </ul>
    </aside>
  )
})

export default AsideComponent
