import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { Layout, InnerHeader, ProductCard, NoData, FilteredProducts } from "../../components";
import Product from "../../types/product";
import { query } from "../../lib/db";

const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

export default function products({ products }) {
  
  //br_id ct_id
  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>(products)
  const { query } = useRouter();
  let type = query.type;
  let q = query.q;
  console.log(q)
  useEffect(() => {
    type === 'brand'
      ?
      setFilteredProducts(products.filter((product: Product) => product.brand.indexOf(`${q}`) >= 0))
      : type === 'category'
        ?
        setFilteredProducts(products.filter((product: Product) => product.category.indexOf(`${q}`) >= 0))
        : 
        setFilteredProducts(products)
  }, [])

  const filterProducts = (title:string, brand:string, category:string) => {
    setFilteredProducts(
      products.filter((product: Product) => 
      product.title.toLocaleLowerCase().indexOf(title.toLocaleLowerCase()) >= 0 
      &&  product.brand.toLocaleLowerCase().indexOf(brand.toLocaleLowerCase())>=0 
      && product.category.toLocaleLowerCase().indexOf(category.toLocaleLowerCase())>=0
      )
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


export async function getServerSideProps(ctx) {
  
  const res = await fetch(`${process.env.URL_ROOT}/api/products/notDeleted`)
  const products = await res.json()
  
  return {
    props: {
      products,
    },
  }
}
