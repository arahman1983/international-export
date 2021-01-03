import { useState, useEffect, useRef, useReducer } from 'react'
import { AdminLayout, AdminSectionHeader, AdminTable,AdmenFilterByDelete, 
  AdminModal, ConfirmDelete, CategoryForm } from '../../components'
import useTranslation from "../../locals/localHook"
import {AdminCategory} from '../../types/categories'
import categoriesReducer from "../../reducers/categories/reducer";
import { addCategory, editCategory } from "../../reducers/categories/actions";


export default function CategoriesAdmin({ categories }) {
  const { t } = useTranslation()
  
  const [allCategories, dispatchCategories] = useReducer(categoriesReducer, categories)
  const [filteredCategories, setFilteredCategories] = useState<AdminCategory[]>(allCategories.filter((category:AdminCategory) => !category.isDeleted))
  const [filterDelete, setFilterDelete] = useState<string | undefined>("false")
  const [modalType, setModalType] = useState<string | undefined>("add")
  const [selected, setSelected] = useState<AdminCategory | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const filterRef = useRef<HTMLSelectElement>()
  
  let tableTitles = ['#', t('Title'), t('A rTitle'), t('CrDate'), t('UpDate'), '']
  
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const confirmDelete = () => {
    /// API for Edit
    dispatchCategories(editCategory(selected.id,{...selected, isDeleted: true}))
    handleClose()
  }

  const restoreItem = (item:AdminCategory) => {
    /// API for Edit
    dispatchCategories(editCategory(item.id,{...item, isDeleted: false}))
    handleClose()
  }

  const editItem = (item:AdminCategory) => {
    /// API for Edit
    dispatchCategories(editCategory(item.id,{...item}))
    handleClose()
  }

  const addItem = (item:AdminCategory) => {
    /// API for Add
    dispatchCategories(addCategory({id: categories.length+1 ,...item}))
    handleClose()
  }

  const handleAdd = () => {
    setModalType("add")
    handleShow()
  }

  const handleDelete = (item:AdminCategory) => {
    setModalType("delete")
    handleShow()
    setSelected(item)
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
            ? <ConfirmDelete confirmDelete={confirmDelete} handleClose={handleClose} />
            : modalType === 'edit'
              ? <CategoryForm type={modalType} item={selected} addItem={addItem} editItem={editItem} handleClose={handleClose} />
              : <CategoryForm type={modalType} item={{}} addItem={addItem} editItem={editItem} handleClose={handleClose} />
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
