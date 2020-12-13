import styles from "../styles/productCard.module.css"
import Link from 'next/link'

export default function ProductCard({ProductItem}) {

  return(
    <div className={`card ${styles.prCard}`}>
      <div className="card-body">
        <img src={ProductItem.image} alt={ProductItem.title} className="w-100" />
        <h4>{ProductItem.title}</h4>
        <p className="text-justify">{ProductItem.description.slice(0,100)}</p>
        <div className="row justify-content-center">
          <Link href={`/product/${ProductItem.id}`}>
            <a className="btn btnPrimaryOutline mx-auto">Read More</a>
          </Link>
        </div>
      </div>
    </div>
  )
}