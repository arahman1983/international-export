import { useState, useEffect, useRef, useReducer } from 'react'
import {
  AdminLayout, AdminSectionHeader, AdminTable,
  AdmenFilterByDelete, AdminModal, ConfirmDelete,
  EditCatComponent, AddCatComponent, ActiveBtn
} from '../../components'
import useTranslation from "../../locals/localHook"
import {AdminCategory} from '../../types/categories'
import categoriesReducer from "../../reducers/categories/reducer";
import { addCategory, editCategory, setCategories } from "../../reducers/categories/actions";


export default function CategoriesAdmin({ categories }) {
  const { t } = useTranslation()
  let tableTitles = ['#', t('Title'), t('A rTitle'), t('CrDate'), t('UpDate'), '']
  // const [allCategories, setAllCategories] = useState<AdminCategory[]>(categories)
  const [allCategories, dispatchCategories] = useReducer(categoriesReducer, categories)
  const [filteredCategories, setFilteredCategories] = useState<AdminCategory[]>(allCategories.filter((category:AdminCategory) => !category.isDeleted))
  const [filterDelete, setFilterDelete] = useState<string | undefined>("false")
  const [modalType, setModalType] = useState<string | undefined>("add")
  const [selected, setSelected] = useState<AdminCategory | undefined>()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const filterRef = useRef<HTMLSelectElement>()

  const confirmDelete = (item:AdminCategory) => {
    dispatchCategories(editCategory(item.id,{...item, isDeleted: true}))
    handleClose()
  }

  const restoreItem = (item:AdminCategory) => {
    dispatchCategories(editCategory(item.id,{...item, isDeleted: false}))
    handleClose()
  }


  const handleDelete = (item:AdminCategory) => {
    setModalType("delete")
    handleShow()
    setSelected(item)
  }

  const handleAdd = () => {
    setModalType("add")
    handleShow()
  }

  const handleEdit = (item:AdminCategory) => {
    setModalType("edit")
    handleShow()
    setSelected(item)
  }

  const filterChange = () => {
    const selectedVal = filterRef?.current?.value
    setFilterDelete(selectedVal)
    if (selectedVal === "true") {
      setFilteredCategories(
        allCategories.filter((category: AdminCategory)  => category.isDeleted === true)
      )
    } else if (selectedVal === "false") {
      setFilteredCategories(
        allCategories.filter((category: AdminCategory)  => category.isDeleted === false)
      )
    } else {
      setFilteredCategories(allCategories)
    }
  }

  useEffect(() => {
    filterChange()

  }, [allCategories])

  return (
    <AdminLayout>
      <AdminSectionHeader 
        sectionName={t("Categories")} 
        handleAdd={handleAdd} />
      <hr />
      <AdmenFilterByDelete 
        filterRef = {filterRef}
        filterDelete={filterDelete} 
        filterChange={filterChange} />
      <hr />
      <AdminTable tableTitles={tableTitles} 
        items={filteredCategories} 
        handleDelete={handleDelete} 
        restoreItem={restoreItem}
        handleEdit={handleEdit} />
      <AdminModal
        show={show}
        handleClose={handleClose}
        formTitle={
          modalType === 'delete'
            ? t('Delete')
            : modalType === 'edit'
              ? t('Edit')
              : t('Add')
        }
        FormComponent={
          modalType === 'delete'
            ? <ConfirmDelete item={selected}  confirmDelete={confirmDelete} handleClose={handleClose} />
            : modalType === 'edit'
              ? <EditCatComponent item={selected} />
              : <AddCatComponent />
        } />
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
