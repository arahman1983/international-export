import styles from "../styles/productCard.module.css"
import Link from 'next/link'
import useTranslation from "../locals/localHook"


export default function ProductCard({ ProductItem }) {
  const { t } = useTranslation()
  return (
    <Link href={`/products/${ProductItem.id}`}>
      <a type="button" className={`card ${styles.prCard}`}>
        <div className="card-body">
          <img src={ProductItem.image} alt={ProductItem.title} className="w-100" />
          <h4>{ProductItem.title}</h4>
          <p className="text-justify">{ProductItem.description.slice(0, 100)}</p>
          <div className="row justify-content-center">
            <Link href={`/products/${ProductItem.id}`}>
              <a className="btn btnPrimaryOutline mx-auto">
                {t("ReadMore")}
              </a>
            </Link>
          </div>
        </div>
      </a>
    </Link>
  )
}