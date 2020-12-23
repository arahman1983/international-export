import styles from '../styles/Home.module.css'
import { Layout, Slider, HomeAbout, ProductCard, BrandSlider } from '../components'
import Product from '../types/product'
import Fade from 'react-reveal/Fade';


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
  //const res = await fetch('https://.../posts')
  //const about = await res.json()

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
      about: {
        title: "About International Export",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently ",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "/images/sliderA.jpg"
      },
      products: [
        {
          id: "1",
          title: "New Product 1",
          description: "Lorem Ipsum simply dummy text of the printing and type industry. Lorem Ipsum has been the industry's standard dummy",
          image: "/images/wheel.webp",
          category: 'wheels',
          brand: 'BMW'
        },
        {
          id: "2",
          title: "Oil",
          description: "Lorem Ipsum simply dummy text of the printing and type industry. Lorem Ipsum has been the industry's standard dummy",
          image: "/images/1.jpg",
          category: 'oil',
          brand: 'Toyota'
        },
        {
          id: "3",
          title: "New Product 3",
          description: "Lorem Ipsum simply dummy text of the printing and type industry. Lorem Ipsum has been the industry's standard dummy",
          image: "/images/lamp.jpg",
          category: 'wheels',
          brand: 'Honda'
        },
        {
          id: "4",
          title: "New Product 4",
          description: "Lorem Ipsum simply dummy text of the printing and type industry. Lorem Ipsum has been the industry's standard dummy",
          image: "/images/lamp.jpg",
          category: 'lamps',
          brand: 'BYD'
        },
        {
          id: "5",
          title: "Product 5",
          description: "Lorem Ipsum simply dummy text of the printing and type industry. Lorem Ipsum has been the industry's standard dummy",
          image: "/images/wheel.webp",
          category: 'lamps',
          brand: 'Hundy'
        }
      ],
      brands: [
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
      ],
      categories: [
        {
          id: "1",
          name: "Wheels"
        },
        {
          id: "2",
          name: "lamps"
        }
      ]
    },
  }
}
