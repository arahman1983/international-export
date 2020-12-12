import styles from '../styles/Home.module.css'
import {Layout, Slider, HomeAbout} from '../components'

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout>
        <Slider />
        <div className="row mx-0">
          Brands slide
        </div>
        <HomeAbout />
        <div className="row mx-0">
          Brands slide
        </div>
      </Layout>
    </div>
  )
}
