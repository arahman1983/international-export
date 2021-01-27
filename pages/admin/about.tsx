import { verify } from 'jsonwebtoken';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { AdminLayout, AdminSectionHeader, UploadImage } from '../../components'
import useTranslation from "../../locals/localHook"
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useGet } from '../../lib/swr-hooks'
import { AboutAdmin } from '../../types/about';
import { NextPageContext } from 'next';
import Router from 'next/router';




export default function AdminAbout({ aboutProps }) {

  const [about, setAbout] = useState<AboutAdmin | undefined>(aboutProps ? aboutProps : {})
  const { t } = useTranslation()
  const SUPPORTED_FORMATS = [".jpg", ".gif", ".png", ".gif"]
  const FILE_SIZE = 10000
  const [changed, setChanged] = useState(false)

  async function submitHandler(values) {
    try {
      const res = await fetch('/api/about/editAbout', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...values,
          id: about.id, 
          }),
      })
      const json = await res.json()
      if (!res.ok) console.log(json.message)
      setAbout({ ...values });
      setChanged(false)
    } catch (e) {
      throw Error(e.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      title: about ? about.title : '',
      title_ar: about ? about.title_ar : '',
      description: about ? about.description : '',
      description_ar: about ? about.description_ar : '',
      details: about ? about.details : '',
      details_ar: about ? about.details_ar : '',
      image: about ? about.image : '',
      keyWords: about ? about.keyWords : ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      title_ar: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      description_ar: Yup.string().required('Required'),
      details: Yup.string().required('Required'),
      details_ar: Yup.string().required('Required'),
      image: Yup.mixed().required('Required'),
      keyWords: Yup.string().required('Required')
    }),
    onSubmit: values => {
      submitHandler(values)
    }
  })

  const setFile = (file) =>{
      formik.values.image = file
      console.log(file)
    }

  useEffect(() => {
    let changes = Object.keys(formik.values).filter(key => formik.values[key] !== about[key])
    if (changes.length > 0) {
      setChanged(true)
    } else {
      setChanged(false)
    }
  }, [formik.values])

  return (
    <AdminLayout>
      <AdminSectionHeader
        sectionName={t("About")}
        handleAdd={() => null} />
      <hr />
      <form onSubmit={formik.handleSubmit}>
        <div className="row mx-0">
          <div className="col-md-8">
            <div className="form-group">
              <label htmlFor="title" className="d-flex justify-content-between">
                {t('Title')}
              </label>
              <input type="text"
                className="form-control"
                id='title'
                {...formik.getFieldProps('title')} />
              {
                formik.touched.title && formik.errors.title ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.title}
                  </div>
                  : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="title_ar">{t('ArTitle')}</label>
              <input type="text"
                className="form-control"
                id='title_ar'
                {...formik.getFieldProps('title_ar')} />
              {
                formik.touched.title_ar && formik.errors.title_ar ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.title_ar}
                  </div>
                  : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="description">{t('Description')}</label>
              <input type="text"
                className="form-control"
                id='description'
                {...formik.getFieldProps('description')} />
              {
                formik.touched.description && formik.errors.description ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.description}
                  </div>
                  : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="description_ar">{t('ArDescription')}</label>
              <input type="text"
                className="form-control"
                id='description_ar'
                {...formik.getFieldProps('description_ar')} />
              {
                formik.touched.description_ar && formik.errors.description_ar ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.description_ar}
                  </div>
                  : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="details">{t('Details')}</label>
              <SunEditor height={200} name="details"
                setContents={formik.values.details}
                onChange={(content) => formik.setValues({ ...formik.values, details: content })}
              />
              {
                formik.touched.details && formik.errors.details ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.details}
                  </div>
                  : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="details_ar">{t('ArDetails')}</label>
              <SunEditor height={200} name="details_ar"
                setContents={formik.values.details_ar}
                onChange={(content) => formik.setValues({ ...formik.values, details_ar: content })}
              />
              {
                formik.touched.details_ar && formik.errors.details_ar ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.details_ar}
                  </div>
                  : null
              }
            </div>
            <div className="form-group">
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
          </div>
          <div className="col-md-4">
            <label htmlFor="image">{t('Image')}</label>
            <UploadImage picUrl={formik.values.image} setFile={setFile} />

          </div>
        </div>
        <div className="row justify-content-center my-3">
          <input disabled={!changed} type="submit" value={t('Save')} className="btn btn-primary col-md-3 col-5 mx-3" />
          <button type="button" className="btn btn-secondary col-md-3 col-5" onClick={formik.handleReset}>
            {t('Cancel')}
          </button>
        </div>
      </form>
    </AdminLayout>
  )
}

export async function getServerSideProps(ctx:NextPageContext) {
  const cookie = ctx.req?.headers.cookie;
  const url = `${process.env.URL_ROOT}/api/about/aboutAdmin`;
  
  const resp = await fetch(url,{headers: {cookie: ctx.req.headers.cookie}});

  if (resp.status === 401 && !ctx.req) {
    Router.replace('/admin/login');
    return {props:{}};
  }

  if (resp.status === 401 && ctx.req) {
    ctx.res.setHeader('Location', '/admin/login');
    ctx.res.statusCode = 302;
    // return { redirect: '/admin/login' }
    return {props:{}};
  }
  const about = await resp.json()
  console.log("before return")
  return {
    props: {
      aboutProps: about ? about[0] : {}
    }
  }
}
