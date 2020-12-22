import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { Layout, InnerHeader, ProductCard } from "../../components";
import Product from "../../types/product";

export default function products({ products }) {
  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>(products)
  const { query } = useRouter();
  let type = query.type;
  let q = query.q;

  useEffect(() => {
    type === 'brand'
      ?
      setFilteredProducts(products.filter((product: Product) => product.brand === q))
      : type === 'category'
        ?
        setFilteredProducts(products.filter((product: Product) => product.category === q))
        : 
        setFilteredProducts(products)
  }, [])



  return (
    <Layout>
      <InnerHeader image='/images/aboutBg.svg' />
      <div className="container my-5">
        <div className="row my-3">
          Filter
        </div>
        <div className="row m-0">
          {
            filteredProducts.map((product: Product, i: number) =>
              <div className="col-md-4" key={i}>
                <ProductCard ProductItem={product} />
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  )
}


export async function getStaticProps() {
  //const res = await fetch('https://.../posts')
  //const about = await res.json()
  return {
    props: {
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
          title: "New Product 2",
          description: "Lorem Ipsum simply dummy text of the printing and type industry. Lorem Ipsum has been the industry's standard dummy",
          image: "/images/lamp.jpg",
          category: 'wheels',
          brand: 'Honda'
        },
        {
          id: "3",
          title: "New Product 3",
          description: "Lorem Ipsum simply dummy text of the printing and type industry. Lorem Ipsum has been the industry's standard dummy",
          image: "/images/lamp.jpg",
          category: 'lamps',
          brand: 'BYD'
        }
      ]
    },
  }
}
