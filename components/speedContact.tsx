import { faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/speedContact.module.css'

export default function SpeedContact() {
  return (
    <div className={styles.speedContact}>
      <a href="#" className={`mx-2 ${styles.icon}`} target="_blank"><FontAwesomeIcon icon={faInstagram} color="#FFF" /></a>
      <a href="#" className={`mx-2 ${styles.icon}`} target="_blank"><FontAwesomeIcon icon={faFacebook} color="#FFF" /></a>
      <a href="#" className={`mx-2 ${styles.icon}`} target="_blank"><FontAwesomeIcon icon={faYoutube} color="#FFF" /></a>
      <a href="tel:010 - 950 - 950 - 11" className={`mx-2 ${styles.icon}`}>
        <FontAwesomeIcon icon={faPhoneAlt} color="#FFF"/>
      </a>
      <a className={styles.phoneNo} href="tel:010 - 950 - 950 - 11" >
        <span>010 - 950 - 950 - 11</span>
      </a>
    </div>
  )
}