import { useState } from 'react'
import Link from 'next/link'
import { faTimes, faBars, faUsers, faPuzzlePiece, faCopyright, faCar, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/sideMenu.module.css'
import { useRouter } from 'next/router'

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  const toggleMenu = (e:React.MouseEvent<HTMLButtonElement>) => {
    setCollapsed(!collapsed)
  }

  const menuItems = [
    {
      title: 'Categories',
      link: '/admin/categories',
      icon: faPuzzlePiece
    },
    {
      title: 'Brands',
      link: '/admin/brands',
      icon: faCopyright
    },
    {
      title: 'Products',
      link: '/admin/products',
      icon: faCar
    },
    {
      title: 'Contact Us',
      link: '/admin/contacts',
      icon: faPhoneAlt
    },
    {
      title: 'Users',
      link: '/admin/users',
      icon: faUsers
    }

  ]

  return (
    <div className={ !collapsed ? styles.sideMenu : styles.sideMenuCollapsed}>
      <button className={`btn my-3 mx-2 ${styles.toggleBtn}`} onClick={toggleMenu}>
        <FontAwesomeIcon icon={!collapsed ? faTimes : faBars} color="#003A5E" style={{ width: '15px' }} />
      </button>
      <ul className={styles.sideMenuUl}>
        {
          menuItems.map((item,i)=> (
            <li className={`${router.pathname === item.link ? styles.sideItemActive : styles.sideItem}`} key={i}>
              <Link href={item.link}>
                <a className={styles.sideLink}> 
                  <FontAwesomeIcon icon={item.icon}
                  style={
                    collapsed 
                    ? { width: '25px', marginLeft: '5px' } 
                    : { width: '18px' }} 
                    />
                  <span className={`mx-3 ${collapsed && 'd-none'}`}> {item.title} </span>
                </a>
              </Link>
            </li>
            ))
        }
        
      </ul>
    </div>
  )
}