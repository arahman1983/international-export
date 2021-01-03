import {useFormik} from 'formik'
import * as Yup from 'yup';
import useTranslation from '../../locals/localHook';

export default function UserForm({type, item, handleClose, editItem, addItem, rolesProps}){
  const {t} = useTranslation()
  const formik = useFormik({
    initialValues: {
      userName : type === 'add' ? '' : item.userName,
      email: type === 'add' ? '' : item.email,
      password: '',
      role : type === 'add' ? '' : rolesProps.find(role => role.title === item.role).id,
    },
    validationSchema: Yup.object({
      userName: Yup.string().required('Required'),
      email: Yup.string().required('required'),
      password: type === 'add' && Yup.string().min(8,'Password must be 8 letters at least'),
      role: Yup.string().required('required'),
    }),
    onSubmit: values => {
      type === 'add'
      ? addItem({ 
        userName: values.userName, 
        email: values.email, 
        password: values.password, 
        role: values.role, 
        createdAt: new Date().toLocaleString(), 
        updatedAt: new Date().toLocaleString() , 
        isDeleted: false})
      : editItem({...item, userName: values.userName, email: values.email, role: values.role })
    },
  })
  return(
    <form className="my-4 row" onSubmit={formik.handleSubmit}>
      <div className="form-group col-md-6">
        <label>{t("UserName")}</label>
        <input type="text" className="form-control" id="userName"
        {...formik.getFieldProps('userName')}
        placeholder={t("EnglishName")}/>
        {
          formik.touched.userName && formik.errors.userName ?
          <div className="alert alert-danger my-3" role="alert">
            {formik.errors.userName}
          </div>
          : null
        }
      </div>
      <div className="form-group col-md-6" style={{position: 'relative'}}>
        <label>{t("EmailTitle")}</label>
        <input type="text" id="email" className="form-control" 
        {...formik.getFieldProps('email')}
        placeholder={t("EmailTitle")}/>
        {
          formik.touched.email && formik.errors.email ?
          <div className="alert alert-danger my-3" role="alert">
            {formik.errors.email}
          </div>
          : null
        }
      </div>
      {
      type === 'add' && 
        <div className="form-group col-md-6" style={{position: 'relative'}}>
          <label>{t("Password")}</label>
          <input type="password" id="password" className="form-control" 
          {...formik.getFieldProps('password')}
          placeholder={t("Password")}/>
          {
            formik.touched.email && formik.errors.email ?
            <div className="alert alert-danger my-3" role="alert">
              {formik.errors.email}
            </div>
            : null
          }
        </div>
      }

      <div className="form-group col-md-6" style={{position: 'relative'}}>
          <label>{t("Roles")}</label>
          <select id="role" className="form-control" 
          {...formik.getFieldProps('role')}
          placeholder={t("Roles")}>
            <option value="" disabled>Select Role</option>
            {
              rolesProps.map(role => <option value={role.id}>{role.title}</option>)
            }

          </select>
          {
            formik.touched.role && formik.errors.role ?
            <div className="alert alert-danger my-3" role="alert">
              {formik.errors.role}
            </div>
            : null
          }
      </div>

      <div className="form-group col-12 d-block">
        <input type="submit" className="btn btn-primary mx-3" value={type === 'add' ? t('Add') : t('Edit')}/>
        <button type="button" className="btn btn-secondary mx-3" onClick={handleClose}>
          {t('Cancel')}
        </button>
      </div>

    </form>
  )
}