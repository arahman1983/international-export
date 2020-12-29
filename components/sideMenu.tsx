import { useState } from 'react'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/sideMenu.module.css'

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false)

  const toggleMenu = (e:React.MouseEvent<HTMLButtonElement>) => {
    setCollapsed(!collapsed)
  }

  return (
    <div className={ collapsed ? styles.sideMenu : styles.sideMenuCollapsed}>
      <button className={`btn my-3 mx-2 ${styles.toggleBtn}`} onClick={toggleMenu}>
        <FontAwesomeIcon icon={collapsed ? faTimes : faBars} color="#003A5E" style={{ width: '15px' }} />
      </button>
    </div>
  )
}