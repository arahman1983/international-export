import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { Layout, Slider, HomeAbout, ProductCard, BrandSlider } from '../components'
import Product from '../types/product'
import Brand from '../types/brands'


export default function Home() {
  const [productsItem] = useState < Product[] | undefined >([
    {
      id: "1",
      title: "New Product 1",
      description: "Lorem Ipsum simply dummy text of the printing and type industry. Lorem Ipsum has been the industry's standard dummy",
      image: "/images/wheel.webp"
    },
    {
      id: "2",
      title: "New Product 2",
      description: "Lorem Ipsum simply dummy text of the printing and type industry. Lorem Ipsum has been the industry's standard dummy",
      image: "/images/lamp.jpg"
    }
  ])
  const [sliderItems] = useState < Brand[] | undefined>([
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
  return (
    <div className={styles.container}>
      <Layout>
        <Slider />
        <div className="container my-5">
          <BrandSlider sliderItems= {sliderItems}/>
        </div>
        <HomeAbout />
        <div className="container">
          <div className="row mx-0 my-5">
            {
              productsItem.map((item, i) =>
                <div className="col-md-3" key={i}>
                  <ProductCard ProductItem={item} />
                </div>
              )
            }
          </div>
        </div>
      </Layout>
    </div>
  )
}
