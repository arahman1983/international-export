import styles from '../styles/Home.module.css'
import { Layout, Slider, HomeAbout, ProductCard, BrandSlider } from '../components'
import Product from '../types/product'
import Fade from 'react-reveal/Fade';

const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

export default function Home({ about, brands, products, slider }) {
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
  const resAbout = await fetch(`${process.env.URL_ROOT}/api/about/about`)
  const about = await resAbout.json()

  const resBrands = await fetch(`${process.env.URL_ROOT}/api/brands/all`)
  const brands = await resBrands.json()

  const resProducts = await fetch(`${process.env.URL_ROOT}/api/products/all`)
  const products = await resProducts.json()

  const resCategories = await fetch(`${process.env.URL_ROOT}/api/categories/all`)
  const categories = await resCategories.json()

  return {
    props: {
      slider: [
        {
          h1: "First slide label",
          h2: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
          image: "/images/slider.svg"
        },
        {
          h1: "Second slide label",
          h2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "/images/slide2.jpeg"
        },
        {
          h1: "Third slide label",
          h2: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
          image: "/images/slide3.jpeg"
        }
      ],
      about: about[0],
      products: products,
      brands: brands,
    },
  }
}
