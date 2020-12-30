import useTranslation from "../locals/localHook"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AdminSectionHeader ({sectionName}) {
  const { t } = useTranslation()

  return(
    <div className="row justify-content-between">
        <h1 className="textPrimary">{sectionName}</h1>
        <button className="btn btnPrimary">
          <FontAwesomeIcon icon={faPlus} color="#FFF" style={{ width: '15px', marginRight: '0.7rem' }} />
          <span>{t('Add')}</span>
        </button>
      </div>
  )
}