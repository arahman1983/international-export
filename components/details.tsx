
import useTranslation from "../locals/localHook"

export default function DetailsPage ({details}){
  const { t } = useTranslation()
return(
  <div className="container my-5" dir={t("Dir")} >
        <div className="row">
          <div className= "col-md-8">
            <h2 className="text-danger w-100" >{details.title}</h2>
            <div className="red-Divider w-50"></div>
            <p className="text-justify my-4" dir={t("Dir")}>
              {details.details}
            </p>
          </div>
          <div className="col-md-4">
            <img src={details.image} className="img-thumbnail w-100" alt={details.title} />
          </div>
        </div>

      </div>
)
}