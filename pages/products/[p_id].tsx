import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DetailsPage, Layout, InnerHeader } from '../../components'
import Link from 'next/link'
import HEAD from 'next/head'

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
      <HEAD>
        <title>{product.title}</title>
        <meta property="og:title" content={product.title} key="title" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={product.details}/>
        <meta name="keywords" content={product.keyWords}/>
      </HEAD>
      <InnerHeader image="/images/sliderA.jpg" />
      <DetailsPage details={productDetails} />
      <div className="container ">
      <div className="row">
          <div className= "col-md-8 mx-auto">
          </div>
          <div className= "col-md-4 text-center">
            <Link href={`/contact`}>
                <a className="btn btnPrimaryOutline mb-5">
                  Order Now
                </a>
            </Link>
          </div>
      </div>
      </div>
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
