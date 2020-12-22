import { Layout } from "../../components";
import { useRouter } from 'next/router'
import { useState } from "react";

export default function products(){
  const router = useRouter()
  const [brand, setBrand] = useState<string | undefined>(router.query.brand && router.query.brand.toString())
  const [category, setCategory] = useState<string | undefined>(router.query.category && router.query.category.toString())
  

  return(
    <Layout>
      {
        brand ? <h1>Products brand</h1> : category ? <h1>Products category</h1> : <h1>All Products</h1>
      }
    </Layout>
  )
}