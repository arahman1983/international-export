import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { AdminLayout, AdminSectionHeader, UploadImage } from '../../components'
import useTranslation from "../../locals/localHook"
import { NextPageContext } from 'next';
import Router from 'next/router'

export default function AdminContacts({ contactsProp }) {
  const [contact, setContact] = useState(contactsProp ? contactsProp : {})
  const { t } = useTranslation()

  const [changed, setChanged] = useState(false)


  const formik = useFormik({
    initialValues: {
      address: contactsProp ? contact.address : '',
      phones: contactsProp ? contact.phones : '',
      emails: contactsProp ? contact.emails : '',
    },
    validationSchema: Yup.object({
      address: Yup.string().required('Required'),
      phones: Yup.string().required('Required'),
      emails: Yup.string().required('Required'),
    }),
    onSubmit: values => {
      setContact({ ...values });
      setChanged(false)
    }
  })


  useEffect(() => {
    let changes = Object.keys(formik.values).filter(key => formik.values[key] !== contact[key])
    if (changes.length > 0) {
      setChanged(true)
    } else {
      setChanged(false)
    }
  }, [formik.values])

  return (
    <AdminLayout>
      <AdminSectionHeader
        sectionName={t("Contact")}
        handleAdd={() => null} />
      <hr />
      <form onSubmit={formik.handleSubmit}>
        <div className="row mx-0">
          <div className="col-md-8">
            <div className="form-group">
              <label htmlFor="address" className="d-flex justify-content-between">
                {t('Address')}
              </label>
              <input type="text"
                className="form-control"
                id='address'
                {...formik.getFieldProps('address')} />
              {
                formik.touched.address && formik.errors.address ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.address}
                  </div>
                  : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="phones">{t('Phones')}</label>
              <input type="text"
                className="form-control"
                id='phones'
                {...formik.getFieldProps('phones')} />
              {
                formik.touched.phones && formik.errors.phones ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.phones}
                  </div>
                  : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="emails">{t('EmailTitle')}</label>
              <input type="text"
                className="form-control"
                id='emails'
                {...formik.getFieldProps('emails')} />
              {
                formik.touched.emails && formik.errors.emails ?
                  <div className="alert alert-danger my-3" role="alert">
                    {formik.errors.emails}
                  </div>
                  : null
              }
            </div>

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
  const url = `${process.env.URL_ROOT}/api/contact/admin`;
  
  const resp = await fetch(url, {
    headers: {
      cookie: cookie!
    }
  });

  if (resp.status === 401 && !ctx.req) {
    Router.replace('/admin/login');
    return {props:{}};
  }

  if (resp.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${process.env.URL_ROOT}/admin/login`
    });
    ctx.res?.end();
    return {props:{}};
  }

  const contact = await resp.json()

  return {
    props: {
      contactsProp:contact[0]
    }
  }
}
