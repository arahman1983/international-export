import { useState } from 'react'
import Link from 'next/link'
import { faTimes, faBars, faUsers, faPuzzlePiece, faCopyright, faCar, faPhoneAlt, faInfoCircle, faImages, faUserTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/sideMenu.module.css'
import { useRouter } from 'next/router'
import useTranslation from "../locals/localHook"

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()

  const toggleMenu = (e:React.MouseEvent<HTMLButtonElement>) => {
    setCollapsed(!collapsed)
  }

  const menuItems = [
    {
      title: t('About'),
      link: '/admin/about',
      icon: faInfoCircle
    },
    {
      title: t('Slide'),
      link: '/admin/slide',
      icon: faImages
    },
    {
      title: t('Categories'),
      link: '/admin/categories',
      icon: faPuzzlePiece
    },
    {
      title: t('AdBrands'),
      link: '/admin/brands',
      icon: faCopyright
    },
    {
      title: t('AdProducts'),
      link: '/admin/products',
      icon: faCar
    },
    {
      title: t('Contact'),
      link: '/admin/contacts',
      icon: faPhoneAlt
    },
    // {
    //   title: t('Users'),
    //   link: '/admin/users',
    //   icon: faUsers
    // },
    // {
    //   title: t('Roles'),
    //   link: '/admin/roles',
    //   icon: faUserTag
    // }

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