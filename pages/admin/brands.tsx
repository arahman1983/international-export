import { useState, useEffect, useRef, useReducer } from 'react'
import {
  AdminLayout, AdminSectionHeader, AdminTable, AdmenFilterByDelete,
  AdminModal, ConfirmDelete, BrandForm
} from '../../components'
import useTranslation from "../../locals/localHook"
import { AdminCategory } from '../../types/categories'
import brandsReducer from "../../reducers/brands/reducer";
import { addBrand, editBrand } from "../../reducers/brands/actions";
import Router from 'next/router';
import { NextPageContext } from 'next';

export default function BrandsAdmin({brands}) {
  const { t } = useTranslation()

  const [allBrands, dispatchBrands] = useReducer(brandsReducer, brands ? brands.map(d => ({
    id: d.id,
    title: d.title,
    title_ar: d.title_ar,
    image: d.image,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
    isDeleted: d.isDeleted
  })): [])
  const [filteredCategories, setFilteredCategories] = useState(allBrands.filter((brand) => !brand.isDeleted))
  const [filterDelete, setFilterDelete] = useState<string | undefined>("false")
  const [modalType, setModalType] = useState<string | undefined>("add")
  const [selected, setSelected] = useState<AdminCategory | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const filterRef = useRef<HTMLSelectElement>()

  let tableTitles = ['#', t('Title'), t('ArTitle'),  t('CrDate'), t('UpDate'), '']

  const editFetch = async (values) =>{
    try {
      const res = await fetch('/api/brands/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id : values.id,
          title: values.title,
          title_ar: values.title_ar,
          image: values.image,
          isDeleted: values.isDeleted
        }),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      dispatchBrands(editBrand(values.id,{...values, isDeleted: values.isDeleted}))
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

  const restoreItem = (item) => {
    /// API for Edit
    editFetch({...item, isDeleted: 0})
  }

  const editItem = (item) => {
    /// API for Edit
    editFetch({...item})
  }

  const addItem = async (item) => {
    /// API for Add
    try {
      const res = await fetch('/api/brands/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: item.title,
          title_ar: item.title_ar,
          image: item.image,
          isDeleted: 0
        }),
      })

      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      dispatchBrands(addBrand({id: json.insertId ,...item}))
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
    setSelected(allBrands.find(i => i.id == item.id ))
  }

  const handleEdit = (item) => {
    setModalType("edit")
    handleShow()
    setSelected(allBrands.find(i => i.id == item.id ))
  }

  const filterChange = () => {
    const selectedVal = filterRef?.current?.value
    setFilterDelete(selectedVal)
    if (selectedVal === "true") {
      setFilteredCategories(
        allBrands.filter((brand) => brand.isDeleted === 1)
      )
    } else if (selectedVal === "false") {
      setFilteredCategories(
        allBrands.filter((brand) => brand.isDeleted === 0)
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
        filterRef={filterRef}
        filterDelete={filterDelete}
        filterChange={filterChange} />
      <hr />
      <AdminTable tableTitles={tableTitles}
        items={filteredCategories.map(c=> ({
          id: c.id,
          title: c.title,
          title_ar: c.title_ar,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
          isDeleted: c.isDeleted
        }))}
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



export async function getServerSideProps(ctx:NextPageContext) {
  const cookie = ctx.req?.headers.cookie;
  const url = `${process.env.URL_ROOT}/api/brands/all`;
  
  const resp = await fetch(url, {
    headers: {
      cookie: cookie!
    }
  });

  if (resp.status === 401 && !ctx.req) {
    Router.replace('/admin/login');
    return {props:{}};
  }

  if (resp.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${process.env.URL_ROOT}/admin/login`
    });
    ctx.res?.end();
    return {props:{}};
  }
  
  const brands = await resp.json()

  return {
    props: {
      brands : brands ? brands : []
    },
  }
}