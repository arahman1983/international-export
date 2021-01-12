import Head from 'next/head'
import { createContext, useState } from 'react'
import { Header, Footer } from "../components"
import { useGet } from '../lib/swr-hooks'

export const BrandsCategoriesContext = createContext([])

export default function Layout({ children }) {
  let lang: string;
  if (typeof (Storage) !== "undefined") {
    lang = localStorage.getItem('lang')
  }

  const brands = useGet('/api/brands/notDeleted')
  const categories = useGet('/api/categories/notDeleted')

  let BrandsArray:[] = brands.data &&
    brands.data.length > 0 && lang === 'ar'
    ? brands?.data?.map((d) => ({ id: d.id, name: d.title_ar }))
    : brands?.data?.map((d) => ({ id: d.id, name: d.title }))

  let categoriesArray:[] = categories.data &&
    categories.data.length > 0 && lang === 'ar'
    ? categories?.data?.map((c) => ({ id: c.id, name: c.title_ar }))
    : categories?.data?.map((c) => ({ id: c.id, name: c.title }))

  return (
    <>
      <Head>
        <title>International Export</title>
        <link rel="icon" href="/fav.png" />
      </Head>
      <div className="w-100 bg-white position-fixed " style={{ zIndex: 999 }}>
        <Header brands={ BrandsArray } categories={ categoriesArray } />
      </div>
      <div style={{ minHeight: '80vh', paddingTop: '120px' }}>
        <BrandsCategoriesContext.Provider value={[categoriesArray, BrandsArray]}>
            {children}
        </BrandsCategoriesContext.Provider>
      </div>
      <Footer />
    </>
  )
}