import { useFormik } from 'formik'
import * as Yup from 'yup';
import useTranslation from '../../locals/localHook';
import { UploadImage } from '../../components'
import { useState } from 'react';

export default function SliderForm({ type, item, handleClose, editItem, addItem }) {
  const [picFile, setPicFile] = useState()
  const { t } = useTranslation()
  const setFile = (file) => setPicFile(file)
  const getBase = (pic) => formik.values.image = pic
  const formik = useFormik({
    initialValues: {
      title: type === 'add' ? '' : item.title,
      title_ar: type === 'add' ? '' : item.title_ar,
      description: type === 'add' ? '' : item.description,
      description_ar: type === 'add' ? '' : item.description_ar,
      image: type === 'add' ? null : item.image
    },
    validationSchema: Yup.object({
      title: Yup.string(),
      title_ar: Yup.string(),
      description: Yup.string(),
      description_ar: Yup.string(),
    }),
    onSubmit: values => {
      type === 'add'
        ? addItem({ 
          title: values.title, 
          title_ar: values.title_ar, 
          image: values.image,
          //picFile: picFile ,
          description: values.description, 
          description_ar: values.description_ar, 
          })
        : editItem({ 
          ...item, 
          title: values.title, 
          title_ar: values.title_ar, 
          image: values.image,
          //picFile: picFile ,
          description: values.description, 
          description_ar: values.description_ar, 
        })
    },
  })
  return (
    <form className="my-4 row" onSubmit={formik.handleSubmit}>
      <div className="form-group col-md-6">
        <label>{t("EnglishName")}</label>
        <input type="text" className="form-control" id="title"
          {...formik.getFieldProps('title')}
          placeholder={t("EnglishName")} />
      </div>
      <div className="form-group col-md-6" style={{ position: 'relative' }}>
        <label>{t("ArabicName")}</label>
        <input type="text" id="title_ar" className="form-control"
          {...formik.getFieldProps('title_ar')}
          placeholder={t("ArabicName")} />
      </div>
      <div className="form-group col-md-6">
        <label>{t("Description")}</label>
        <input type="text" className="form-control" id="description"
          {...formik.getFieldProps('description')}
          placeholder={t("Description")} />
      </div>
      <div className="form-group col-md-6" style={{ position: 'relative' }}>
        <label>{t("ArDescription")}</label>
        <input type="text" id="description_ar" className="form-control"
          {...formik.getFieldProps('description_ar')}
          placeholder={t("ArDescription")} />
      </div>
      <div className="form-group col-md-12">
        <UploadImage picUrl={formik.values.image} setFile={setFile} getBase={getBase}/>
      </div>
      <div className="form-group mx-auto">
        <input type="submit" className="btn btn-primary mx-3" value={type === 'add' ? t('Add') : t('Edit')} />
        <button type="button" className="btn btn-secondary mx-3" onClick={handleClose}>
          {t('Cancel')}
        </button>
      </div>

    </form>
  )
}