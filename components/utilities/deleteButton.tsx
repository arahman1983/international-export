import useTranslation from "../../locals/localHook"
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DeleteBtn ({handleDelete}) {
  const { t } = useTranslation()
  
  return (
    <button className="btn btn-danger" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTimes} color="#FFF" style={{ width: '15px', marginRight: '0.7rem' }} />
        <span>{t('Delete')}</span>
      </button>
  )
}