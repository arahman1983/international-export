import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { Layout, Slider, HomeAbout, ProductCard, BrandSlider } from '../components'
import Product from '../types/product'
import Fade from 'react-reveal/Fade';

const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

export default function Home({ aboutProps, brandsProps, productsProps, sliderProps }) {
  let lang: string
  if (typeof Storage !== 'undefined') {
    lang = localStorage.getItem('lang')
  }
  const [about, setAbout] = useState(aboutProps)
  const [brands, setBrands] = useState(brandsProps)
  const [slider, setSlider] = useState(sliderProps)
  const [products, setProducts] = useState(productsProps)


  useEffect(() => {
    if (lang === 'ar') {
      setProducts(productsProps.map(product => ({
        ...product,
        title: product.title_ar,
        details: product.details_ar,
        description: product.description_ar
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
      setProducts(productsProps),
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
            products.map((product: Product, i: number) =>
              <div className="col-md-4" key={i}>
                <ProductCard ProductItem={product} />
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  </div>
)
}



export async function getStaticProps() {
  const resSlider = await fetch(`${process.env.URL_ROOT}/api/slides/notDeleted`)
  const slider = await resSlider.json()

  const resAbout = await fetch(`${process.env.URL_ROOT}/api/about/about`)
  const about = await resAbout.json()

  const resBrands = await fetch(`${process.env.URL_ROOT}/api/brands/notDeleted`)
  const brands = await resBrands.json()

  const resProducts = await fetch(`${process.env.URL_ROOT}/api/products/notDeleted?limit=6`)
  const products = await resProducts.json()

  return {
    props: {
      sliderProps: slider,
      aboutProps: about[0],
      productsProps: products,
      brandsProps: brands,
    },
  }
}
