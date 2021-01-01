import { useState, useEffect, useRef, useReducer } from 'react'
import { AdminLayout, AdminSectionHeader, AdminTable,AdmenFilterByDelete, 
  AdminModal, ConfirmDelete, BrandForm } from '../../components'
import useTranslation from "../../locals/localHook"
import {AdminCategory} from '../../types/categories'
import categoriesReducer from "../../reducers/categories/reducer";
import { addCategory, editCategory } from "../../reducers/categories/actions";


export default function BrandsAdmin({ brands }) {
  const { t } = useTranslation()
  
  const [allBrands, dispatchBrands] = useReducer(categoriesReducer, brands)
  const [filteredCategories, setFilteredCategories] = useState<AdminCategory[]>(allBrands.filter((brand:AdminCategory) => !brand.isDeleted))
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
    dispatchBrands(editCategory(selected.id,{...selected, isDeleted: true}))
    handleClose()
  }

  const restoreItem = (item:AdminCategory) => {
    /// API for Edit
    dispatchBrands(editCategory(item.id,{...item, isDeleted: false}))
    handleClose()
  }

  const editItem = (item:AdminCategory) => {
    /// API for Edit
    dispatchBrands(editCategory(item.id,{...item}))
    handleClose()
  }

  const addItem = (item:AdminCategory) => {
    /// API for Add
    dispatchBrands(addCategory({id: brands.length+1 ,...item}))
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
        allBrands.filter((brand: AdminCategory)  => brand.isDeleted === true)
      )
    } else if (selectedVal === "false") {
      setFilteredCategories(
        allBrands.filter((brand: AdminCategory)  => brand.isDeleted === false)
      )
    } else {
      setFilteredCategories(allBrands)
    }
  }

  useEffect(() => {
    filterChange()
  }, [allBrands])

  return (
    <AdminLayout>
      <AdminSectionHeader 
        sectionName={t("Brands")} 
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
              ? <BrandForm type={modalType} item={selected} addItem={addItem} editItem={editItem} handleClose={handleClose} />
              : <BrandForm type={modalType} item={{}} addItem={addItem} editItem={editItem} handleClose={handleClose} />
        } />
    </AdminLayout>
  )
}


export async function getStaticProps() {
  //const res = await fetch('https://.../posts')
  //const about = await res.json()

  return {
    props: {
      brands: [
        {
          id: 1,
          title: "Brand Name",
          title_ar: "اسم العلامة",
          created: '2020-12-31 10:30:00',
          updated: '2020-12-31 10:30:00',
          isDeleted: false
        },
        {
          id: 2,
          title: "Brand Name",
          title_ar: "اسم العلامة",
          created: '2020-12-31 10:30:00',
          updated: '2020-12-31 10:30:00',
          isDeleted: true
        },
        {
          id: 3,
          title: "Brand Name",
          title_ar: "اسم العلامة",
          created: '2020-12-31 10:30:00',
          updated: '2020-12-31 10:30:00',
          isDeleted: false
        },
      ]
    },
  }
}
