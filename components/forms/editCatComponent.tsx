import {useFormik} from 'formik'
import * as Yup from 'yup';
import useTranslation from '../../locals/localHook';

export default function EditComponent({type, item, handleClose, editItem, addItem}){
  const {t} = useTranslation()
  const formik = useFormik({
    initialValues: {
      title : type === 'add' ? '' : item.title,
      title_ar: type === 'add' ? '' : item.title_ar,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      title_ar: Yup.string().required('required')
    }),
    onSubmit: values => {
      // send to login API
      type === 'add'
      ? addItem({title_ar: values.title_ar, title: values.title, createdAt: new Date().toLocaleString(), updatedAt: new Date().toLocaleString() , isDeleted: false})
      : editItem({...item, title_ar: values.title_ar, title: values.title})
    },
  })
  return(
    <form className="my-4 row" onSubmit={formik.handleSubmit}>
    <div className="form-group col-md-6">
      <input type="text" className="form-control" id="title"
      {...formik.getFieldProps('title')}
      placeholder={t("EnglishName")}/>
      {
        formik.touched.title && formik.errors.title ?
        <div className="alert alert-danger my-3" role="alert">
          {formik.errors.title}
        </div>
        : null
      }
    </div>
    <div className="form-group col-md-6" style={{position: 'relative'}}>
      <input type="text" id="title_ar" className="form-control" 
      {...formik.getFieldProps('title_ar')}
      placeholder={t("ArabicName")}/>
      {
        formik.touched.title_ar && formik.errors.title_ar ?
        <div className="alert alert-danger my-3" role="alert">
          {formik.errors.title_ar}
        </div>
        : null
      }
    </div>
    <div className="form-group mx-auto">
      <input type="submit" className="btn btn-primary mx-3" value={type === 'add' ? t('Add') : t('Edit')}/>
      <button type="button" className="btn btn-secondary mx-3" onClick={handleClose}>
        {t('Cancel')}
      </button>
    </div>

  </form>
  )
}