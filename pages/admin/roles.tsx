import { useState, useEffect, useRef, useReducer } from 'react'
import { AdminLayout, AdminSectionHeader, AdminTable, AdmenFilterByDelete, 
  AdminModal, ConfirmDelete, RolesForm } from '../../components'
import useTranslation from "../../locals/localHook"
import {AdminCategory} from '../../types/categories'
import rolesReducer from "../../reducers/roles/reducer";
import { addRole, editRole } from "../../reducers/roles/actions";


export default function RolesAdmin({ rolesProps }) {
  const { t } = useTranslation()
  
  const [allRoles, dispatchRoles] = useReducer(rolesReducer, rolesProps)
  const [filteredCategories, setFilteredCategories] = useState<AdminCategory[]>(allRoles.filter((role:AdminCategory) => !role.isDeleted))
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
    dispatchRoles(editRole(selected.id,{...selected, isDeleted: true}))
    handleClose()
  }

  const restoreItem = (item:AdminCategory) => {
    /// API for Edit
    dispatchRoles(editRole(item.id,{...item, isDeleted: false}))
    handleClose()
  }

  const editItem = (item:AdminCategory) => {
    /// API for Edit
    dispatchRoles(editRole(item.id,{...item}))
    handleClose()
  }

  const addItem = (item:AdminCategory) => {
    /// API for Add
    dispatchRoles(addRole({id: rolesProps.length+1 ,...item}))
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
        allRoles.filter((category: AdminCategory)  => category.isDeleted === true)
      )
    } else if (selectedVal === "false") {
      setFilteredCategories(
        allRoles.filter((category: AdminCategory)  => category.isDeleted === false)
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


export async function getStaticProps() {
  //const res = await fetch('https://.../posts')
  //const about = await res.json()

  return {
    props: {
      rolesProps: [
        {
          id: 1,
          title: "Admin",
          title_ar: "مدير الموقع",
          created: '2020-12-31 10:30:00',
          updated: '2020-12-31 10:30:00',
          isDeleted: false
        },
        {
          id: 2,
          title: "Content",
          title_ar: "مدير محتوى",
          created: '2020-12-31 10:30:00',
          updated: '2020-12-31 10:30:00',
          isDeleted: false
        },
      ]
    },
  }
}
