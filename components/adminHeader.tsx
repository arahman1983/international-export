import styles from '../styles/adminHeader.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function AdminHeader(){
  return(
    <div className={`bg-light py-2 px-5 ${styles.header} `}>
      <Image src="/images/logo.png" className="mx-auto" width={155} height={100} />
      <ul className="nav my-5">
      <li className="nav-item mx-2">
        <Link href='/admin/profile'>
          <button className="btn mt-3">
            <FontAwesomeIcon icon={faUser} color="#888" style={{width:'15px', marginRight: '10px', marginTop:'0'}} />
            <span>User Name</span>
          </button>
        </Link>
        </li>
        
        <li className="nav-item mx-2">
          
            <button className="btn mt-3">
              <FontAwesomeIcon icon={faSignOutAlt} color="#888" style={{width:'15px', marginRight: '10px', marginTop:'0'}} />
              <span>Logout</span>
            </button>
        </li>
        
      </ul>
    </div>
  )
}