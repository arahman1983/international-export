import Link from 'next/link'
import styles from '../../styles/aboutHome.module.css'

export default function HomeAbout() {
  return (
    <div className={`row mx-0 p-5 ${styles.aboutHome}`}>
      <h1 className="w-100">What We Do in National Export</h1>
      <p className="container my-3 px-5 text-justify text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <div className="container" style={{zIndex: 99}}>
        <Link href="/about">
          <button className={`btn btnInvertOutline`}>
            Read More
          </button>
        </Link>
      </div>
    </div>
  )
}