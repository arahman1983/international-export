import { useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from "../locals/localHook"
import { LanguageContext } from '../locals/langProvider'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import SpeedContact from './speedContact'
import Brand from '../types/brands'
import Category from '../types/categories'


export default function Header() {
  const router = useRouter()

  // function to get the language translation 
  const { t } = useTranslation()

  // language context and function to change language
  const [locale, setLocale] = useContext(LanguageContext)
  const changeLang = () => {
    let newLocal: string = t("ChangeLang").toLowerCase();
    setLocale(newLocal)
    localStorage.setItem('lang', newLocal)
  }

  // get brand and category

  const [brands] = useState<Brand[]>([
    {
      id: "1",
      name: "Toyota",
      image: "/images/toyota.png"
    },
    {
      id: "2",
      name: "Renault",
      image: "/images/rino.png"
    },
    {
      id: "3",
      name: "Hundy",
      image: "/images/huy.png"
    },
    {
      id: "4",
      name: "BYD",
      image: "/images/byd.png"
    },
    {
      id: "5",
      name: "BMW",
      image: "/images/bmw.png"
    }
  ])

  const [categories] = useState<Category[]>([
    {
      id: "1",
      name: "wheels"
    },
    {
      id: "2",
      name: "lamps"
    }
  ])





  return (
    <div className="container" >
      <Navbar bg="white" expand="lg" className="w-100 p-0">
        <Link href="/">
          <a><Image src="/images/logo.png" width={188} height={133} alt="International Export" /></a>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <SpeedContact />

          <Nav className="ml-auto mt-5" dir={t("Dir")} >
            <Link href="/">
              <a className={`nav-link ${router.pathname === '/' && 'active'}`}>{t("Home")}</a>
            </Link>
            <Link href="/about">
              <a className={`nav-link ${router.pathname === '/about' && 'active'}`}>{t("About")}</a>
            </Link>
            <NavDropdown title={t("Products")} id="products">
              {
                categories.map((category: Category, i: number) => (
                  <Link href={`/products?type=category&q=${category.name}`} key={i}>
                    <a className="dropdown-item" >{category.name}</a>
                  </Link>
                ))
              }
            </NavDropdown>
            <NavDropdown title={t("Brands")} id="Brands">
              {
                brands.map((brand: Brand, i: number) => (
                  <Link href={`/products?type=brand&q=${brand.name}`} key={i}>
                    <a className="dropdown-item" >{brand.name}</a>
                  </Link>
                ))
              }
            </NavDropdown>
            <Link href="/contact">
              <a className={`nav-link ${router.pathname === '/contact' && 'active'}`}>{t("Contact")}</a>
            </Link>
            <Nav.Link onClick={changeLang}>{t("ChangeLang")}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div >
  )
}