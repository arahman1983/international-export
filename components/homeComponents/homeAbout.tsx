import { useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/aboutHome.module.css'
import useTranslation from "../../locals/localHook"
import About from "../../types/about"

export default function HomeAbout({about}) {
  const { t } = useTranslation()
  return (
    <div className={`row mx-0 p-5 ${styles.aboutHome}`}>
      <h2 className="w-100">{about.title}</h2>
      <p className="w-md-90 mx-auto my-3 px-md-5 text-justify text-center">
        {about.description}
      </p>
      <div className="container" style={{ zIndex: 99 }}>
        <Link href="/about">
          <button className={`btn btnInvertOutline`}>
            {t("ReadMore")}
          </button>
        </Link>
      </div>
    </div>
  )
}