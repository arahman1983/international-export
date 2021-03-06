import {useFormik} from 'formik'
import * as Yup from 'yup';
import useTranslation from '../../locals/localHook';
import { UploadImage } from '..'
import { useState } from 'react';
// import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

export default function ProductsForm({type, item, handleClose, editItem, addItem, categories, brandsProps}){
  const {t} = useTranslation()
  const [picFile, setPicFile] = useState()
  const setFile = (file) => setPicFile(file)
  const getBase = (pic) => formik.values.image = pic

  const formik = useFormik({
    initialValues: {
      title : type === 'add' ? '' : item.title,
      title_ar: type === 'add' ? '' : item.title_ar,
      description : type === 'add' ? '' : item.description,
      description_ar: type === 'add' ? '' : item.description_ar,
      details : type === 'add' ? '' : item.details,
      details_ar: type === 'add' ? '' : item.details_ar,
      ct_id : type === 'add' ? '' : item.ct_id,
      br_id : type === 'add' ? '' : item.br_id,
      keyWords : type === 'add' ? '' : item.keyWords,
      image: type === 'add' ? null : item.image
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      title_ar: Yup.string().required('required'),
      description : Yup.string().required('required'),
      description_ar: Yup.string().required('required'),
      details : Yup.string().required('required'),
      details_ar: Yup.string().required('required'),
      ct_id : Yup.string().required('required'),
      br_id : Yup.string().required('required'),
      keyWords : Yup.string().required('required'),
    }),
    onSubmit: values => {
      type === 'add'
      ? addItem({ 
        title: values.title, 
        title_ar: values.title_ar, 
        description : values.description,
        description_ar: values.description_ar,
        details : values.details,
        details_ar: values.details_ar,
        ct_id: Number(values.ct_id),
        br_id: Number(values.br_id),
        keyWords : values.keyWords,
        image: values.image,
        picFile: picFile ,
        })
      : editItem({
        ...item, 
        title: values.title, 
        title_ar: values.title_ar,
        description : values.description,
        description_ar: values.description_ar,
        details : values.details,
        details_ar: values.details_ar,
        ct_id: Number(values.ct_id),
        br_id: Number(values.br_id),
        keyWords : values.keyWords,
        image: values.image,
        picFile: picFile , 
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

      <div className="form-group col-md-12">
        <label>{t("Description")}</label>
        <input type="text" className="form-control" id="description"
        {...formik.getFieldProps('description')}
        placeholder={t("Description")}/>
        {
          formik.touched.description && formik.errors.description ?
          <div className="alert alert-danger my-3" role="alert">
            {formik.errors.description}
          </div>
          : null
        }
      </div>
      <div className="form-group col-md-12" style={{position: 'relative'}}>
        <label>{t("ArDescription")}</label>
        <input type="text" id="description_ar" className="form-control" 
        {...formik.getFieldProps('description_ar')}
        placeholder={t("ArDescription")}/>
        {
          formik.touched.description_ar && formik.errors.description_ar ?
          <div className="alert alert-danger my-3" role="alert">
            {formik.errors.description_ar}
          </div>
          : null
        }
      </div>
      
      <div className="form-group col-md-12">
              <label htmlFor="details">{t('Details')}</label>
              <textarea rows={8} id="details" className="form-control" 
                {...formik.getFieldProps('details')}
                placeholder={t("Details")} ></textarea>
              {
                formik.touched.details && formik.errors.details ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.details}
                  </div>
                  : null
              }
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="details_ar">{t('ArDetails')}</label>
              {/* <SunEditor height={200} name="details_ar"
                setContents={formik.values.details_ar}
                onChange={(content) => formik.setValues({ ...formik.values, details_ar: content })}
              /> */}
              <textarea rows={8} id="details_ar" className="form-control" 
                {...formik.getFieldProps('details_ar')}
                placeholder={t("ArDetails")} ></textarea>
              {
                formik.touched.details_ar && formik.errors.details_ar ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.details_ar}
                  </div>
                  : null
              }
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="ct_id">{t('Categories')}</label>
              <select className="form-control" value="" id='ct_id' {...formik.getFieldProps('ct_id')} >
                  <option value="" disabled>Select Category</option>
                  {
                    categories?.map((c, i) => <option key={i} value={c.id}>{c.title}</option>)
                  }
              </select>
              {
                formik.touched.ct_id && formik.errors.ct_id ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.ct_id}
                  </div>
                  : null
              }
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="br_id">{t('Brands')}</label>
              <select className="form-control" id='br_id' value="" {...formik.getFieldProps('br_id')} >
                  <option value="" disabled>Select Category</option>
                  {
                    brandsProps?.map((b, i) => <option key={i} value={b.id}>{b.title}</option>)
                  }
              </select>
              {
                formik.touched.br_id && formik.errors.br_id ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.br_id}
                  </div>
                  : null
              }
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="keyWords">{t('KeyWords')}</label>
              <input type="text"
                className="form-control"
                id='keyWords'
                {...formik.getFieldProps('keyWords')} />
              {
                formik.touched.keyWords && formik.errors.keyWords ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.keyWords}
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