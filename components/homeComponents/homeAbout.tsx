import { useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/aboutHome.module.css'
import useTranslation from "../../locals/localHook"
import About from "../../types/about"

export default function HomeAbout() {
  const { t } = useTranslation()
  const [aboutShort] = useState<About | undefined>({
    title: "What We Do in National Export",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  })
  return (
    <div className={`row mx-0 p-5 ${styles.aboutHome}`}>
      <h1 className="w-100">{aboutShort.title}</h1>
      <p className="container my-3 px-5 text-justify text-center">
        {aboutShort.description}
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