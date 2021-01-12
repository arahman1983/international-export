import { useState, useEffect, useRef, useReducer } from 'react'
import { AdminLayout, AdminSectionHeader, AdminTable, AdmenFilterByDelete, 
  AdminModal, ConfirmDelete, RolesForm } from '../../components'
import useTranslation from "../../locals/localHook"
import {AdminCategory} from '../../types/categories'
import rolesReducer from "../../reducers/roles/reducer";
import { setRoles, addRole, editRole } from "../../reducers/roles/actions";
import { useGet } from '../../lib/swr-hooks'
import Router from 'next/router'
import { NextPageContext } from 'next';


export default function RolesAdmin({roles}) {
  const { t } = useTranslation()

  const [allRoles, dispatchRoles] = useReducer(rolesReducer, roles ? roles.map( d => ({
    id: d.r_id,
    title: d.r_role,
    title_ar: d.r_role_ar,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
    isDeleted: d.r_isDeleted,
  })) : [])

  const [filteredCategories, setFilteredCategories] = useState<AdminCategory[]>(allRoles.filter((role:AdminCategory) => !role.isDeleted))
  const [filterDelete, setFilterDelete] = useState<string | undefined>("false")
  const [modalType, setModalType] = useState<string | undefined>("add")
  const [selected, setSelected] = useState<AdminCategory | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const filterRef = useRef<HTMLSelectElement>()

  const editFetch = async (values) =>{
    try {
      const res = await fetch('/api/roles/edit', {
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
      dispatchRoles(editRole(values.id,{...values, isDeleted: values.isDeleted}))
      handleClose()
    } catch (e) {
      throw Error(e.message)
    }
  }
  
  
  
  let tableTitles = ['#', t('Title'), t('ArTitle'), t('CrDate'), t('UpDate'), '']
  
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

  const addItem = async (item:AdminCategory) => {
    /// API for Add
    try {
      const res = await fetch('/api/roles/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: item.title,
          title_ar: item.title_ar,
          isDeleted: 0
        }),
      })

      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      dispatchRoles(addRole({id: json.insertId ,...item, isDeleted : 0}))
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
        allRoles.filter((category: AdminCategory)  => category.isDeleted === 1)
      )
    } else if (selectedVal === "false") {
      setFilteredCategories(
        allRoles.filter((category: AdminCategory)  => category.isDeleted === 0)
      )
    } else {
      setFilteredCategories(allRoles)
    }
  }

  useEffect(() => {
    filterChange()
  }, [allRoles])

  return (
    <AdminLayout>
      <AdminSectionHeader 
        sectionName={t("Roles")} 
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
              ? <RolesForm type={modalType} item={selected} addItem={addItem} editItem={editItem} handleClose={handleClose} />
              : <RolesForm type={modalType} item={{}} addItem={addItem} editItem={editItem} handleClose={handleClose} />
        } />
    </AdminLayout>
  )
}


export async function getServerSideProps(ctx: NextPageContext) {

  const cookie = ctx.req?.headers.cookie;
  const url = `${process.env.URL_ROOT}/api/roles/all`;
  
  const resp = await fetch(url, {
    headers: {
      cookie: cookie!
    }
  });

  if (resp.status === 401 && !ctx.req) {
    Router.replace('/admin/login');
    return {};
  }

  if (resp.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${process.env.URL_ROOT}/admin/login`
    });
    ctx.res?.end();
    return;
  }


  const roles = await resp.json()

  return {
    props: {
      roles
    },
  }
}