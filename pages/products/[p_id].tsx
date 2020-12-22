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
  let products = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    }
  ]
  const paths = products.map((product) => `/products/${product.id}`)
  return { paths, fallback: false }
}

export async function getStaticProps({params}) {
  //const res = await fetch('https://.../posts')
  //const about = await res.json()
  return {
    props: {
      product: {
        title: "Product Name " + params.p_id,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently ",
        details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "/images/sliderA.jpg"
      },
    },
  }
}
