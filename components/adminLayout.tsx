import Head from 'next/head'
import { AdminHeader, SideMenu, AdminFooter } from "../components"

export default function AdminLayout({ children }) {

  return (
    <>
      <Head>
        <title>International Export :: Admin Panel</title>
        <link rel="icon" href="/fav.png" />
      </Head>
      <AdminHeader />
      <div className="row mx-0">
        <SideMenu />
        <div className="content-warper">
          {children}
        </div>
      </div>
          <AdminFooter/>
      {/* <Footer/> */}
      </>
  )
}