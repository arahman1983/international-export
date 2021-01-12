import {useFormik} from 'formik'
import * as Yup from 'yup';
import useTranslation from '../../locals/localHook';

export default function ChangePasswordForm ({handleChange, handleClose}){
  const {t} = useTranslation()
  const formik = useFormik({
    initialValues: {
      old_password : '',
      password: '',
      cPassword: '',
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required('Old Password Required'),
      password: Yup.string().required('Password is required'),
      cPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: values => {
      handleChange({old_password : values.old_password, password: values.password, cPassword: values.cPassword})
    },
  })
  return(
    <form className="my-4" onSubmit={formik.handleSubmit}>
      <div className="form-group col-md-6">
        <label>{t("OldPassword")}</label>
        <input type="password" className="form-control" id="old_password"
        {...formik.getFieldProps('old_password')}
        placeholder={t("OldPassword")}/>
        {
          formik.touched.old_password && formik.errors.old_password ?
          <div className="alert alert-danger my-3" role="alert">
            {formik.errors.old_password}
          </div>
          : null
        }
      </div>
      <div className="row col-12">
        <div className="form-group col-md-6" style={{position: 'relative'}}>
          <label>{t("NewPassword")}</label>
          <input type="password" id="password" className="form-control" 
          {...formik.getFieldProps('password')}
          placeholder={t("NewPassword")}/>
          {
            formik.touched.password && formik.errors.password ?
            <div className="alert alert-danger my-3" role="alert">
              {formik.errors.password}
            </div>
            : null
          }
        </div>
        <div className="form-group col-md-6" style={{position: 'relative'}}>
          <label>{t("CoPassword")}</label>
          <input type="password" id="cPassword" className="form-control" 
          {...formik.getFieldProps('cPassword')}
          placeholder={t("CoPassword")}/>
          {
            formik.touched.cPassword && formik.errors.cPassword ?
            <div className="alert alert-danger my-3" role="alert">
              {formik.errors.cPassword}
            </div>
            : null
          }
        </div>
      </div>
      <div className="col-12 d-flex justify-content-center my-3">
        <div className="form-group mx-auto">
          <input type="submit" className="btn btn-primary mx-3" value={t('ChangePassword')}/>
          <button type="button" className="btn btn-secondary mx-3" onClick={handleClose}>
            {t('Cancel')}
          </button>
        </div>
      </div>

    </form>
  )
}