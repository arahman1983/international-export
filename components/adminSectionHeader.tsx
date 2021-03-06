import useTranslation from "../locals/localHook"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AdminSectionHeader ({sectionName, handleAdd}) {
  const { t } = useTranslation()

  return(
    <div className="row justify-content-between">
        <h1 className="textPrimary mt-3">{sectionName}</h1>
        {
          sectionName !==  t('About') && sectionName !==  t('Contact') 
          ?
            <button className="btn btnPrimary" onClick={handleAdd}>
              <FontAwesomeIcon icon={faPlus} color="#FFF" style={{ width: '15px', marginRight: '0.7rem' }} />
              <span>{t('Add')}</span>
            </button>
          : null
        }
    </div>
  )
}