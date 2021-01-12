import useTranslation from "../../locals/localHook"

export default function ConfirmDelete({handleClose, confirmDelete}){
  const { t } = useTranslation()
  return(
    <>
      <p className="text-danger text-center">{t('ConfirmMessage')}</p>
      <div className="d-flex justify-content-center">
          <button className="btn btn-secondary mx-2" onClick={handleClose}>
              {t('Cancel')}
          </button>
          <button className="btn btn-danger mx-2" onClick={confirmDelete}>
              {t('Delete')}
          </button>
      </div>
    </>
  )
}