import { useState, useEffect, useRef, useReducer } from 'react'
import { AdminLayout, AdminSectionHeader, AdminTable, AdmenFilterByDelete, 
  AdminModal, ConfirmDelete, ProductsForm } from '../../components'
import useTranslation from "../../locals/localHook"
// import {AdminProduct} from '../../types/product'
import productsReducer from "../../reducers/products/reducer";
import { addProduct, editProduct } from "../../reducers/products/actions";


export default function ProductsAdmin({ productsProps, brandsProps, categories  }) {
  const { t } = useTranslation()
  console.log(productsProps)
  const [allProducts, dispatchProducts] = useReducer(productsReducer, productsProps)
  const [filteredProducts, setFilteredProducts] = useState(allProducts.filter((product) => !product.isDeleted))
  const [filterDelete, setFilterDelete] = useState<string | undefined>("false")
  const [modalType, setModalType] = useState<string | undefined>("add")
  const [selected, setSelected] = useState()
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

  const restoreItem = (item) => {
    /// API for Edit
    dispatchProducts(editProduct(item.id,{...item, isDeleted: false}))
    handleClose()
  }

  const editItem = async (item) => {
    /// API for Edit
    dispatchProducts(editProduct(item.id,{...item}))
    handleClose()
  }

  const addItem = async (item) => {
    /// API for Add
    try {
      const res = await fetch('/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: item.title, 
          title_ar: item.title_ar, 
          description: item.description, 
          description_ar: item.description_ar,
          details: item.details,
          details_ar: item.details_ar,
          ct_id: item.ct_id,
          br_id: item.br_id,
          image: item.image,
          keyWords: item.keyWords,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      dispatchProducts(addProduct({id: productsProps.length+1 ,...item}))
      handleClose()
    } catch (e) {
      throw Error(e.message)
    }
  }

  const handleAdd = () => {
    setModalType("add")
    handleShow()
  }

  const handleDelete = (item) => {
    setModalType("delete")
    handleShow()
    setSelected(item)
  }

  const handleEdit = (item) => {
    setModalType("edit")
    handleShow()
    setSelected(item)
  }

  const filterChange = () => {
    const selectedVal = filterRef?.current?.value
    setFilterDelete(selectedVal)
    if (selectedVal === "true") {
      setFilteredProducts(
        allProducts.filter((category)  => category.isDeleted === true)
      )
    } else if (selectedVal === "false") {
      setFilteredProducts(
        allProducts.filter((category)  => category.isDeleted === false)
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
              ? <ProductsForm categories = {categories} brandsProps={brandsProps} type={modalType} item={allProducts.find((product)=> product.id === selected.id)} addItem={addItem} editItem={editItem} handleClose={handleClose} />
              : <ProductsForm categories = {categories} brandsProps={brandsProps} type={modalType} item={{}} addItem={addItem} editItem={editItem} handleClose={handleClose} />
        } />
    </AdminLayout>
  )
}


export async function getStaticProps() {
  const res = await fetch(`${process.env.URL_ROOT}/api/products/all`)
  const products = await res.json()

  const resBrands = await fetch(`${process.env.URL_ROOT}/api/brands/all`)
  const brands = await resBrands.json()

  const resCat = await fetch(`${process.env.URL_ROOT}/api/categories/all`)
  const categories = await resCat.json()

  return {
    props: {
      brandsProps: brands,
      categories: categories,
      productsProps: products
    },
  }
}
