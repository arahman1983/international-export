import { useState, useEffect, useRef, useReducer } from 'react'
import { AdminLayout, AdminSectionHeader, AdminTable, AdmenFilterByDelete, 
  AdminModal, ConfirmDelete, ProductsForm } from '../../components'
import useTranslation from "../../locals/localHook"
import {AdminProduct} from '../../types/product'
import productsReducer from "../../reducers/products/reducer";
import { addProduct, editProduct } from "../../reducers/products/actions";


export default function ProductsAdmin({ productsProps }) {
  const { t } = useTranslation()
  console.log(productsProps)
  const [allProducts, dispatchProducts] = useReducer(productsReducer, productsProps)
  const [filteredProducts, setFilteredProducts] = useState<AdminProduct[]>(allProducts.filter((product:AdminProduct) => !product.isDeleted))
  const [filterDelete, setFilterDelete] = useState<string | undefined>("false")
  const [modalType, setModalType] = useState<string | undefined>("add")
  const [selected, setSelected] = useState<AdminProduct | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const filterRef = useRef<HTMLSelectElement>()
  
  let tableTitles = ['#', t('Title'), t('ArTitle'), t('CrDate'), t('UpDate'), '']
  
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const confirmDelete = () => {
    /// API for Edit
    dispatchProducts(editProduct(selected.id,{...selected, isDeleted: true}))
    handleClose()
  }

  const restoreItem = (item:AdminProduct) => {
    /// API for Edit
    dispatchProducts(editProduct(item.id,{...item, isDeleted: false}))
    handleClose()
  }

  const editItem = (item:AdminProduct) => {
    /// API for Edit
    dispatchProducts(editProduct(item.id,{...item}))
    handleClose()
  }

  const addItem = (item:AdminProduct) => {
    /// API for Add
    dispatchProducts(addProduct({id: productsProps.length+1 ,...item}))
    handleClose()
  }

  const handleAdd = () => {
    setModalType("add")
    handleShow()
  }

  const handleDelete = (item:AdminProduct) => {
    setModalType("delete")
    handleShow()
    setSelected(item)
  }

  const handleEdit = (item:AdminProduct) => {
    setModalType("edit")
    handleShow()
    setSelected(item)
  }

  const filterChange = () => {
    const selectedVal = filterRef?.current?.value
    setFilterDelete(selectedVal)
    if (selectedVal === "true") {
      setFilteredProducts(
        allProducts.filter((category: AdminProduct)  => category.isDeleted === true)
      )
    } else if (selectedVal === "false") {
      setFilteredProducts(
        allProducts.filter((category: AdminProduct)  => category.isDeleted === false)
      )
    } else {
      setFilteredProducts(allProducts)
    }
  }

  useEffect(() => {
    filterChange()
  }, [allProducts])

  return (
    <AdminLayout>
      <AdminSectionHeader 
        sectionName={t("Products")} 
        handleAdd={handleAdd} />
      <hr />
      <AdmenFilterByDelete 
        filterRef = {filterRef}
        filterDelete={filterDelete} 
        filterChange={filterChange} />
      <hr />
      <AdminTable tableTitles={tableTitles} 
        items={filteredProducts.map(({id,title, title_ar, createdAt, updatedAt, isDeleted}) => ({id, title, title_ar, createdAt, updatedAt, isDeleted}))} 
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
              ? <ProductsForm type={modalType} item={allProducts.find((product)=> product.id === selected.id)} addItem={addItem} editItem={editItem} handleClose={handleClose} />
              : <ProductsForm type={modalType} item={{}} addItem={addItem} editItem={editItem} handleClose={handleClose} />
        } />
    </AdminLayout>
  )
}


export async function getStaticProps() {
  const res = await fetch(`${process.env.URL_ROOT}/api/products/all`)
  const products = await res.json()

  return {
    props: {
      productsProps: products
    },
  }
}
