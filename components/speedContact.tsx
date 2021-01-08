import { faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGet } from '../lib/swr-hooks'
import styles from '../styles/speedContact.module.css'

export default function SpeedContact() {
  const {data, isError, isLoading} = useGet('/api/contact/all')
  return (
    <div className={styles.speedContact}>
      <a href="#" className={`mx-2 ${styles.icon}`} target="_blank"><FontAwesomeIcon icon={faInstagram} color="#FFF" /></a>
      <a href="#" className={`mx-2 ${styles.icon}`} target="_blank"><FontAwesomeIcon icon={faFacebook} color="#FFF" /></a>
      <a href="#" className={`mx-2 ${styles.icon}`} target="_blank"><FontAwesomeIcon icon={faYoutube} color="#FFF" /></a>
      <a href="tel:010 - 950 - 950 - 11" className={`mx-2 ${styles.icon}`}>
        <FontAwesomeIcon icon={faPhoneAlt} color="#FFF"/>
      </a>
      {
      data && 
      <a className={styles.phoneNo} href={`tel: ${data[0].phones.split(',')[0]}`} >
        <span>{data[0].phones.split(',')[0]}</span>
      </a>
      }
    </div>
  )
}