
import useTranslation from "../locals/localHook"

export default function DetailsPage ({details}){
  const { t } = useTranslation()
  const dir = t("Dir")
return(
  <div className="container" dir={dir} style={{marginTop: '-80px'}} >
        <div className="row">
          <div className= "col-md-8">
            <h2 className={`text-danger w-100 ${dir === 'rtl' && 'text-right'}`} >{details.title}</h2>
            <div className="red-Divider w-50"></div>
            <p className="text-justify my-4" dir={dir}>
              {details.details}
            </p>
          </div>
          <div className="col-md-4">
            <img src={details.image} className="w-100 my-5" alt={details.title} />
          </div>
        </div>

      </div>
)
}