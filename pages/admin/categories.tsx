import { useState } from 'react'
import { AdminLayout, AdminSectionHeader, AdminTable, AdmenFilterByDelete, AdminModal } from '../../components'
import useTranslation from "../../locals/localHook"


export default function CategoriesAdmin({ categories }) {
  const { t } = useTranslation()
  let tableTitles = ['#', t('Title'), t('ArTitle'), t('CrDate'), t('UpDate'), '']
  const [filteredCategories, setFilteredCategories] = useState(categories.filter(category => !category.isDeleted))
  const [filterDelete, setFilterDelete] = useState("false")
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleDelete = () => {
    handleShow()
  }

  const handleAdd = () => {
    handleShow()
  }

  const handleEdit = () => {
    handleShow()
  }

  const filterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterDelete(e.target.value)
    let categoryState = e.target.value === "true"
    if (e.target.value === "true") {
      setFilteredCategories(
        categories.filter(category => category.isDeleted === true)
      )
    } else if (e.target.value === "false") {
      setFilteredCategories(
        categories.filter(category => category.isDeleted === false)
      )
    } else {
      setFilteredCategories(categories)
    }
  }

  return (
    <AdminLayout>
      <AdminSectionHeader sectionName={t("Categories")} handleAdd={handleAdd} />
      <hr />
      <AdmenFilterByDelete filterDelete={filterDelete} filterChange={filterChange} />
      <hr />
      <AdminTable tableTitles={tableTitles} items={filteredCategories} handleDelete={handleDelete} handleEdit={handleEdit}  />
      <AdminModal show={show} handleClose={handleClose}/>
    </AdminLayout>
  )
}


export async function getStaticProps() {
  //const res = await fetch('https://.../posts')
  //const about = await res.json()

  return {
    props: {
      categories: [
        {
          id: 1,
          title: "Category Name",
          title_ar: "اسم الصنف",
          created: '2020-12-31 10:30:00',
          updated: '2020-12-31 10:30:00',
          isDeleted: false
        },
        {
          id: 2,
          title: "Category Name",
          title_ar: "اسم الصنف",
          created: '2020-12-31 10:30:00',
          updated: '2020-12-31 10:30:00',
          isDeleted: true
        },
        {
          id: 3,
          title: "Category Name",
          title_ar: "اسم الصنف",
          created: '2020-12-31 10:30:00',
          updated: '2020-12-31 10:30:00',
          isDeleted: false
        },
      ]
    },
  }
}
