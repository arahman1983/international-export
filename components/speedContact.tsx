import { faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGet } from '../lib/swr-hooks'
import styles from '../styles/speedContact.module.css'

export default function SpeedContact() {
  const { data, isError, isLoading } = useGet('/api/contact/all')
  return (
    (<div className={styles.speedContact}>
      {
        data && <>
          {data[0].Instagram &&
            <a href={data[0].Instagram} className={`mx-2 ${styles.icon}`} target="_blank"><FontAwesomeIcon icon={faInstagram} color="#FFF" /></a>
          }
          {data[0].Facebook &&
            <a href={data[0].Facebook} className={`mx-2 ${styles.icon}`} target="_blank"><FontAwesomeIcon icon={faFacebook} color="#FFF" /></a>
          }
          {data[0].Youtube &&
            <a href={data[0].Youtube} className={`mx-2 ${styles.icon}`} target="_blank"><FontAwesomeIcon icon={faYoutube} color="#FFF" /></a>
          }
          <a href="tel:010 - 950 - 950 - 11" className={`mx-2 ${styles.icon}`}>
            <FontAwesomeIcon icon={faPhoneAlt} color="#FFF" />
          </a>
          <a className={styles.phoneNo} href={`tel: ${data[0].phones.split(',')[0]}`} >
            <span>{data[0].phones.split(',')[0]}</span>
          </a>

        </>
      }
    </div>)
  )
}