import {useState, useRef} from 'react'
import styles from '../../styles/adminlogin.module.css'
import useTranslation from '../../locals/localHook'
import { useFormik } from 'formik';
import Image from 'next/image'
import * as Yup from 'yup';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Login() {
  const {t} = useTranslation()
  const [showPass, setShowPass] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('password is required')
    }),
    onSubmit: values => {
      // send to login API
      console.log(JSON.stringify(values, null, 2));
    },
  })

  const togglePassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShowPass(!showPass)
  }

  return(
    <div className={styles.loginPage}>
      <div className={`card ${styles.loginCard}`}>
        <div className="card-body">
          <div className="w-100 text-center">
            <Image src="/images/logo.png" className="mx-auto" width={140} height={100} />
          </div>
          <h3>{t('LoginHead')}</h3>
          <form className="my-4" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" id="email"
              {...formik.getFieldProps('email')}
              placeholder={t("EmailInput")}/>
              {
                formik.touched.email && formik.errors.email ?
                <div className="alert alert-danger my-3" role="alert">
                  {formik.errors.email}
                </div>
                : null
              }
            </div>
            <div className="form-group" style={{position: 'relative'}}>
              <input type={showPass ? "text" : "password"} id="password" className="form-control" 
              {...formik.getFieldProps('password')}
              placeholder={t("PasswordInput")}/>
              <button
              type="button" 
                className={`btn ${styles.togglePass}` } onClick={togglePassword}>
                <FontAwesomeIcon icon={showPass? faLockOpen : faLock} color="#888" style={{width:'15px'}} />
              </button>
              {
                formik.touched.password && formik.errors.password ?
                <div className="alert alert-danger my-3" role="alert">
                  {formik.errors.password}
                </div>
                : null
              }
            </div>
            <div className="form-group"><input type="submit" className="btn btn-secondary btn-block"/></div>

          </form>
        </div>
      </div>
    </div>
  )
}