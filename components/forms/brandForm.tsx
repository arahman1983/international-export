import {useFormik} from 'formik'
import * as Yup from 'yup';
import useTranslation from '../../locals/localHook';
import { UploadImage } from '../../components'
import { useState } from 'react';

export default function BrandForm({type, item, handleClose, editItem, addItem}){
  const {t} = useTranslation()
  const [picFile, setPicFile] = useState()
  const setFile = (file) => setPicFile(file)
  const getBase = (pic) => formik.values.image = pic


  const formik = useFormik({
    initialValues: {
      title : type === 'add' ? '' : item.title,
      title_ar: type === 'add' ? '' : item.title_ar,
      image: type === 'add' ? null : item.image
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      title_ar: Yup.string().required('required')
    }),
    onSubmit: values => {
      type === 'add'
      ? addItem({ 
        title: values.title, 
        title_ar: values.title_ar, 
        image: values.image,
        picFile: picFile ,
        createdAt: new Date().toLocaleString(), 
        updatedAt: new Date().toLocaleString() , 
        isDeleted: false})
      : editItem({
        ...item, 
        title: values.title, 
        title_ar: values.title_ar,
        image: values.image,
        picFile: picFile , 
        updatedAt: new Date().toLocaleString() , 
      })
    },
  })
  return(
    <form className="my-4 row" onSubmit={formik.handleSubmit}>
      <div className="form-group col-md-6">
        <label>{t("EnglishName")}</label>
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
        <label>{t("ArabicName")}</label>
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

      <UploadImage picUrl={formik.values.image} setFile={setFile} getBase={getBase}/>
      
      <div className="form-group mx-auto">
        <input type="submit" className="btn btn-primary mx-3" value={type === 'add' ? t('Add') : t('Edit')}/>
        <button type="button" className="btn btn-secondary mx-3" onClick={handleClose}>
          {t('Cancel')}
        </button>
      </div>

    </form>
  )
}