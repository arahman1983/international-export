import { useState, useEffect, useRef, useReducer } from 'react'
import { AdminLayout, AdminSectionHeader, AdminTable,AdmenFilterByDelete, 
  AdminModal, ConfirmDelete, CategoryForm } from '../../components'
import useTranslation from "../../locals/localHook"
import {AdminCategory} from '../../types/categories'
import categoriesReducer from "../../reducers/categories/reducer";
import { addCategory, editCategory } from "../../reducers/categories/actions";
import { useGet } from '../../lib/swr-hooks'

export default function CategoriesAdmin() {
  const { t } = useTranslation()
  const {data, isLoading, isError}  = useGet('/api/categories/all')
  const [allCategories, dispatchCategories] = useReducer(categoriesReducer, data && data.map(d => ({
    id: d.id,
    title: d.title,
    title_ar: d.title_ar,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
    isDeleted: d.isDeleted
  })))
  const [filteredCategories, setFilteredCategories] = useState<AdminCategory[]>(allCategories.filter((category:AdminCategory) => !category.isDeleted))
  const [filterDelete, setFilterDelete] = useState<string | undefined>("false")
  const [modalType, setModalType] = useState<string | undefined>("add")
  const [selected, setSelected] = useState<AdminCategory | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const filterRef = useRef<HTMLSelectElement>()

  
  let tableTitles = ['#', t('Title'), t('ArTitle'), t('CrDate'), t('UpDate'), '']

  const editFetch = async (values) =>{
    try {
      const res = await fetch('/api/categories/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id : values.id,
          title: values.title,
          title_ar: values.title_ar,
          isDeleted: values.isDeleted
        }),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      dispatchCategories(editCategory(values.id,{...values, isDeleted: 1}))
      handleClose()
    } catch (e) {
      throw Error(e.message)
    }
  }


  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const confirmDelete = () => {
    /// API for Edit
    editFetch({...selected, isDeleted: 1})
  }

  const restoreItem = (item:AdminCategory) => {
    /// API for Edit
    editFetch({...item, isDeleted: 0})
  }

  const editItem = (item:AdminCategory) => {
    /// API for Edit
    editFetch({...item})
  }

  const addItem = async (item:AdminCategory) => {
    /// API for Add
    try {
      const res = await fetch('/api/categories/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: item.title,
          title_ar: item.title_ar,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      dispatchCategories(addCategory({id: json.insertId ,...item}))
      handleClose()
    } catch (e) {
      throw Error(e.message)
    }
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
        allCategories.filter((category: AdminCategory)  => category.isDeleted === 1)
      )
    } else if (selectedVal === "false") {
      setFilteredCategories(
        allCategories.filter((category: AdminCategory)  => category.isDeleted === 0)
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