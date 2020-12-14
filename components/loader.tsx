
import styles from '../styles/loader.module.css'
import Lottie from 'react-lottie';
import loadingData from '../animationJson/carLoad.json'

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <Lottie options={{
        loop: true,
        autoplay: true,
        animationData: loadingData,
      }}
        height={200}
        width={200}
        />
    </div>
  )
}