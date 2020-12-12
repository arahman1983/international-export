import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import SpeedContact from './speedContact'


export default function Header() {
  return (
      <div className="container">
        <Navbar bg="white" expand="lg" className="w-100 p-0">
          <Link href="/">
            <a><Image src="/images/logo.png" width={188} height={133} alt="International Export" /></a>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            <SpeedContact />
            
            <Nav className="ml-auto mt-5">
              <Link href="/">
                <Nav.Link href="/" >Home</Nav.Link>
              </Link>
              <Link href="/about">
                <Nav.Link href="/about" >About</Nav.Link>
              </Link>
              <NavDropdown title="Products" id="products">
                <Link href="/">
                  <NavDropdown.Item >Something</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <Link href="/">
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </Link>
              </NavDropdown>
              <NavDropdown title="Brands" id="Brands">
                <Link href="/">
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <Link href="/">
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </Link>
              </NavDropdown>
              <Link href="/contact">
                <Nav.Link href="/contact">Contact us</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </div>
  )
}