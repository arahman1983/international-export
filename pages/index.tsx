import styles from '../styles/Home.module.css'
import {Layout, Slider} from '../components'

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout>
        <Slider />
      </Layout>
    </div>
  )
}
