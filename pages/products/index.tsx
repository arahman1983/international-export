import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { Layout, InnerHeader, ProductCard, NoData, FilteredProducts } from "../../components";
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

  const filterProducts = (title:string, brand:string, category:string) => {
    setFilteredProducts(
      products.filter((product: Product) => 
      product.title.toLocaleLowerCase().indexOf(title.toLocaleLowerCase()) >= 0 &&  product.brand.toLocaleLowerCase().indexOf(brand.toLocaleLowerCase())>=0 && product.category.toLocaleLowerCase().indexOf(category.toLocaleLowerCase())>=0)
      )
  }



  return (
    <Layout>
      <InnerHeader image='/images/sliderA.jpg' />
      <div className="container my-5">
        
        <FilteredProducts filterProducts={filterProducts} type={type} q={q} />
        
        <div className="row m-0 justify-content-center">
          {
            filteredProducts?.length > 0 
            ?
            filteredProducts.map((product: Product, i: number) =>
              <div className="col-md-4" key={i}>
                <ProductCard ProductItem={product} />
              </div>
            )
            :
            <NoData message="Products you search about not found" />
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
