import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DetailsPage, Layout, InnerHeader } from '../../components'


export default function ProductDetails({product}) {
  const [productDetails, setProductDetails] = useState<any>({...product})
  let lang: string
  if(typeof Storage !== 'undefined'){
    lang = localStorage.getItem('lang')
  }
  useEffect(() => {
    if(lang){
      lang === 'ar' 
        ? setProductDetails ({
          ...product,
          title: product.title_ar,
          details: product.details_ar,
          description: product.description_ar
        })
        : setProductDetails ({
          ...product
        })
    }
    
  }, [lang])
  return (
    <Layout>
      <InnerHeader image="/images/sliderA.jpg" />
      <DetailsPage details={productDetails} />
    </Layout>
  )
}

// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.URL_ROOT}/api/products/notDeleted`)
//   const products = await res.json()

//   const paths = products.map((product) => `/products/${product.id}`)
//   return { paths, fallback: false }
// }

export async function getServerSideProps(ctx) {
  const res = await fetch(`${process.env.URL_ROOT}/api/products/${ctx.query.p_id}`)
  const product = await res.json()
  return {
    props: {
      product: product[0]
    },
  }
}
