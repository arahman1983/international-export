import Link from 'next/link'
import styles from '../styles/loader.module.css'
import Lottie from 'react-lottie';
import errorData from '../animationJson/404.json'
import useTranslation from "../locals/localHook"

export default function Custom404() {
  const { t } = useTranslation()
  return (
    <div className={styles.loaderContainer}>
      <Lottie options={{
        loop: true,
        autoplay: true,
        animationData: errorData,
      }}
        height={400}
        width={400}
      />
      <h4 className="text-center"> Page Not Found </h4>
      <Link href="/">
        <a> Back to Home </a>
      </Link>
    </div>
  )
}