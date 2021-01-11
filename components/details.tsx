
import useTranslation from "../locals/localHook"
import Image from 'next/image'
export default function DetailsPage ({details}){
  const { t } = useTranslation()
  const dir = t("Dir")
return(
  <div className="container my-5" dir={dir} >
        <div className="row">
          <div className= "col-md-8 mx-auto">
            <h2 className={`text-danger w-100 ${dir === 'rtl' && 'text-right'}`} >{details.title}</h2>
            <div className="red-Divider w-50" dir={dir}></div>
            <p className="text-justify my-4" dir={dir}>
              {details.details}
            </p>
          </div>
          <div className="col-md-4 text-center">
          {details.image && <Image src={details.image} width={200} height={'auto'} alt={details.title} />}
          </div>
          
        </div>

      </div>
)
}