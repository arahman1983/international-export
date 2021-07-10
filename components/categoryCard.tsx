import styles from "../styles/categoryCard.module.css"
import Link from 'next/link'
import useTranslation from "../locals/localHook"
import Fade from 'react-reveal/Fade';


export default function CategoryCard({ item }) {
  const { t } = useTranslation()
  return (
    <Fade>
      <Link href={`/products?type=category&q=${item.title}`}>
        <a type="button" className={`card ${styles.prCard} mb-5`}>
          <div className={`card-body ${styles.flexCard}`}>
            <div className={styles.imageContainer}>
              {item.image && <img src={item.image} alt={item.title} />}
            </div>
            <div className={styles.title}>
              <h4>{item.title}</h4>
            </div>
            {/* <div className="row justify-content-center">
              <Link href={`/products?type=category&q=${item.title}`}>
                <a className="btn btnPrimaryOutline mx-auto">
                  {t("Browse Products")}
                </a>
              </Link>
            </div> */}
          </div>
        </a>
      </Link>
    </Fade>
  )
}