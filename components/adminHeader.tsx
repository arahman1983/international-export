import styles from '../styles/adminHeader.module.css'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import {AdminModal, ChangePasswordForm} from '../components'
import useTranslation from '../locals/localHook'

export default function AdminHeader(){
  const { t } = useTranslation()
  const [modalType] = useState<string | undefined>("changePassword")
  const router = useRouter()
  const [show, setShow] = useState<boolean>(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const logoutHandler = async(e) => {
    e.preventDefault();
    try {
      const resp = await fetch('/api/users/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await resp.json();
    router.push('/admin/login')
    
    } catch (e) {
      console.log(e.message)
    }
  }

  const ChangePassword = async (item) => {
    try {
      const res = await fetch('/api/users/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1, 
          old_password: item.old_password,
          password: item.password,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      // dispatchRoles(addRole({id: json.insertId ,...item, isDeleted : 0}))
      handleClose()
    } catch (e) {
      throw Error(e.message)
    }
    
  }

  return(
    <div className={`bg-light py-2 px-5 ${styles.header} `}>
      {/* <Image src="/images/logo.png" className="mx-auto" width={155} height={100} /> */}
      <h3 className="my-3 text-danger">International Export</h3>
      <ul className="nav">
      <li className="nav-item mx-2">
          <button className="btn mt-3" onClick={(e)=> {
            e.preventDefault();
            handleShow()
          }}>
            <FontAwesomeIcon icon={faUser} color="#888" style={{width:'15px', marginRight: '10px', marginTop:'0'}} />
            <span>User Name</span>
          </button>
        </li>
        
        <li className="nav-item mx-2">
          
            <button className="btn mt-3" onClick = {logoutHandler}>
              <FontAwesomeIcon icon={faSignOutAlt} color="#888" style={{width:'15px', marginRight: '10px', marginTop:'0'}} />
              <span>Logout</span>
            </button>
        </li>
        
      </ul>

      <AdminModal
        show={show}
        handleClose={handleClose}
        formTitle={
          modalType === 'changePassword'
              ? t('ChangePassword')
              : ''
        }
        FormComponent={
          modalType === 'changePassword'
            ? <ChangePasswordForm handleChange={ChangePassword} handleClose={handleClose} />
            : <div></div>
        } />
    </div>
  )
}