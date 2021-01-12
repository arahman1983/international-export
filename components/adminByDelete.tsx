import useTranslation from "../locals/localHook"

export default function AdmenFilterByDelete({filterDelete, filterChange, filterRef }){
  const { t } = useTranslation()
  return(
    <div className="row d-flex flex-row-reverse">
        <div className="col-md-4 py-3 d-flex">
          <label className="w-25 mt-2 text-secondary">{t('FilterDelete')}</label>
          <select className="form-control" ref={filterRef} defaultValue={filterDelete} onChange={filterChange}>
            <option value="0">{t('All')}</option>
            <option value="false">{t("ActiveItem")}</option>
            <option value="true">{t("DeleteItem")}</option>
          </select>
        </div>
      </div>
  )
}