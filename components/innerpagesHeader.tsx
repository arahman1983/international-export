import styles from '../styles/innerHead.module.css'

export default function InnerHeader ({image}) {
  return (
  <div className={styles.innerHeader}>
    <img src={image} className="w-100" />
  </div>
  )
}