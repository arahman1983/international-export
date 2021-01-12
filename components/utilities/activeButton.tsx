import useTranslation from "../../locals/localHook"
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ActiveBtn ({restoreItem}) {
  const { t } = useTranslation()

  return (
    <button className="btn btn-success" onClick={ restoreItem }>
        <FontAwesomeIcon icon={faRedo} color="#FFF" style={{ width: '15px', marginRight: '0.7rem' }} />
        <span>{t('RestoreItem')}</span>
    </button>
  )
}