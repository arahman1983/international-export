import { DetailsPage, Layout, InnerHeader } from '../../components'


export default function ProductDetails({product}) {
  return (
    <Layout>
      <InnerHeader image={product.image} />
      <DetailsPage details={product} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.URL_ROOT}/api/products/all`)
  const products = await res.json()

  const paths = products.map((product) => `/products/${product.id}`)
  return { paths, fallback: false }
}

export async function getStaticProps({params}) {
  const res = await fetch(`${process.env.URL_ROOT}/api/products/${params.p_id}`)
  const product = await res.json()
  return {
    props: {
      product
    },
  }
}
