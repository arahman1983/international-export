import styles from '../styles/contactInfo.module.css'
import useTranslation from "../locals/localHook"
import { faPhoneAlt, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function ContactInfo () {
  const { t } = useTranslation();
  const dir = t("Dir")

  return(
    <div dir={dir}>
      <h4 className={`text-danger w-100 ${dir === 'rtl' && 'text-right'}`}>{t("ContactInfo")}</h4>
      <div className="red-Divider w-50"></div>
      <div className="my-3">
        <div className="d-flex my-3">
          <div className={styles.icon}>
              <FontAwesomeIcon icon={faMapMarkerAlt} color="#dc3545" style={{width:'15px'}} />
          </div>
          <p className="m-0">15 building name, Street Name, Town, Country</p>
        </div>

        <div className="d-flex my-3">
          <div className={styles.icon}>
              <FontAwesomeIcon icon={faPhoneAlt} color="#dc3545" style={{width:'15px'}} />
          </div>
          <p className="m-0">010-202-3555</p>
        </div>

        <div className="d-flex my-3">
          <div className={styles.icon}>
              <FontAwesomeIcon icon={faEnvelope} color="#dc3545" style={{width:'15px'}} />
          </div>
          <p className="m-0">info@international-expo.com</p>
        </div>

      </div>
    </div>
  )
}