
import useTranslation from "../locals/localHook"

export default function DetailsPage ({details}){
  const { t } = useTranslation()
  const dir = t("Dir")
return(
  <div className="container" dir={dir} >
        <div className="row">
          <div className= "col-md-10 mx-auto">
            <h2 className={`text-danger w-100 ${dir === 'rtl' && 'text-right'}`} >{details.title}</h2>
            <div className="red-Divider w-50" dir={dir}></div>
            <p className="text-justify my-4" dir={dir}>
              {details.details}
            </p>
          </div>
          
        </div>

      </div>
)
}