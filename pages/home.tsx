import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { Layout, Slider, HomeAbout, CategoryCard, BrandSlider } from '../components'
import Fade from 'react-reveal/Fade';

// const fetch = require('node-fetch');
const path = require('path')

const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

export default function Home({ aboutProps, brandsProps, categoriesProps, sliderProps }) {
  let lang: string
  if (typeof Storage !== 'undefined') {
    lang = localStorage.getItem('lang')
  }
  const [about, setAbout] = useState(aboutProps)
  const [brands, setBrands] = useState(brandsProps)
  const [slider, setSlider] = useState(sliderProps)
  const [categories, setCategories] = useState(categoriesProps)


  useEffect(() => {
    if (lang === 'ar') {
      setCategories(categoriesProps.map(category => ({
        ...category,
        title: category.title_ar,
        details: category.details_ar,
        description: category.description_ar
      })))
      setSlider(sliderProps.map(slide => ({
        ...slide,
        title: slide.title_ar,
        description: slide.description_ar
      })))
      setBrands(brandsProps.map(brand => ({
        ...brand,
        title: brand.title_ar,
      })))
      setAbout({
        ...aboutProps,
        title: aboutProps.title_ar,
        description: aboutProps.description_ar,
        details: aboutProps.details_ar
      })
    } else {
      setCategories(categoriesProps),
        setSlider(sliderProps),
        setBrands(brandsProps),
        setAbout(aboutProps)
    } 
}, [lang])
return (
  <div className={styles.container}>
    <Layout>
      <Fade>
        <Slider slider={slider} />
      </Fade>
      <div className="container my-5">
        <Fade>
          <BrandSlider sliderItems={brands} />
        </Fade>
      </div>
      <Fade>
        <HomeAbout about={about} />
      </Fade>
      <div className="container">
        <div className="row mx-0 my-5 justify-content-center">
          {
            categories.map((category:unknown, i: number) =>
              <div className="col-md-4" key={i}>
                <CategoryCard item={category} />
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  </div>
)
}



export async function getServerSideProps() {
  const resSlider = await fetch(`${process.env.URL_ROOT}/api/slides/notDeleted`)
  const slider = await resSlider.json()

  const resAbout = await fetch(`${process.env.URL_ROOT}/api/about/about`)
  const about = await resAbout.json()

  const resBrands = await fetch(`${process.env.URL_ROOT}/api/brands/notDeleted`)
  const brands = await resBrands.json()

  const resCategories = await fetch(`${process.env.URL_ROOT}/api/categories/notDeleted`)
  const categories = await resCategories.json()

  return {
    props: {
      sliderProps: slider ? slider : [],
      aboutProps: about ? about[0] : {},
      categoriesProps: categories ? categories : [],
      brandsProps: brands ? brands : [],
    },
  }
}
