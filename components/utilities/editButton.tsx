import useTranslation from "../../locals/localHook"
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function EditBtn ({handleEdit}) {
  const { t } = useTranslation()

  return (
    <button className="btn btn-primary" onClick={ handleEdit }>
        <FontAwesomeIcon icon={faPencilAlt} color="#FFF" style={{ width: '15px', marginRight: '0.7rem' }} />
        <span>{t('Edit')}</span>
      </button>
  )
}