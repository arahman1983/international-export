import { useState, useEffect, useRef, useReducer } from 'react'
import {
  AdminLayout, AdminSectionHeader, AdminTable, AdmenFilterByDelete,
  AdminModal, ConfirmDelete, UserForm
} from '../../components'
import useTranslation from "../../locals/localHook"
import { User } from '../../types/users'
import usersReducer from "../../reducers/users/reducer";
import { addUser, editUser } from "../../reducers/users/actions";
import fetch from 'isomorphic-unfetch'
import { NextPageContext } from 'next';
import Router from 'next/router'


export default function UsersAdmin({ usersProps, rolesProps }) {
  const { t } = useTranslation()

  const [allUsers, dispatchUsers] = useReducer(usersReducer, usersProps.map((user) => {
    return {
      id: user.u_id,
      userName: user.u_name,
      email: user.u_email,
      role: user.r_role,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      isDeleted: user.u_isDeleted
    }
  }))
  const [filteredUsers, setFilteredUsers] = useState<User[]>(allUsers.filter((user) => user.isDeleted === 0))
  const [filterDelete, setFilterDelete] = useState<string | undefined>("false")
  const [modalType, setModalType] = useState<string | undefined>("add")
  const [selected, setSelected] = useState<User | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const filterRef = useRef<HTMLSelectElement>()

  let tableTitles = ['#', t('UserName'), t('EmailTitle'), t('Roles'), t('CrDate'), t('UpDate'), '']

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const confirmDelete = async () => {
    /// API for Edit
    try {
      const res = await fetch('/api/users/adminEdit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selected.id, role_id: rolesProps.find(r => r.role == selected.role)?.id, isDeleted: 1 }),
      })
      const json = await res.json()
      if (!res.ok) console.log(json.message)
      dispatchUsers(editUser(selected.id, { ...selected, isDeleted: 1 }))
      handleClose()
    } catch (e) {
      throw Error(e.message)
    }
    
  }

  const restoreItem = async (item) => {
    /// API for Edit
    try {
      const res = await fetch('/api/users/adminEdit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: item.id, role_id: rolesProps.find(r => r.role == item.role)?.id, isDeleted: 0 }),
      })
      const json = await res.json()
      if (!res.ok) console.log(json.message)
      dispatchUsers(editUser(item.id, { ...item, isDeleted: 0 }))
      handleClose()
    } catch (e) {
      throw Error(e.message)
    }
    
  }

  const editItem = async (item) => {
    /// API for Edit
    try {
      const res = await fetch('/api/users/adminEdit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: item.id, role_id: item.role, isDeleted: item.isDeleted }),
      })
      const json = await res.json()
      if (!res.ok) console.log(json.message)
      dispatchUsers(editUser(item.id, { ...item, role: rolesProps.find(r => r.id == item.role).role }))
      handleClose()
    } catch (e) {
      throw Error(e.message)
    }
  }

  const addItem = async (item) => {
    /// API for Add
    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: item.userName,
          password: item.password,
          email: item.email,
          role: Number(item.role)
        }),
      })
      const json = await res.json()
      if (!res.ok) console.log(json.message)
      dispatchUsers(addUser({
        id: json.insertId,
        userName: item.userName,
        email: item.email,
        role: rolesProps.find(r => r.id == item.role)?.role ,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        isDeleted: 0
      }))
      handleClose()

    } catch (e) {
      console.log(e.message)
    }
    
  }

  const handleAdd = () => {
    setModalType("add")
    handleShow()
  }

  const handleDelete = (item: User) => {
    setModalType("delete")
    handleShow()
    setSelected(item)
  }

  const handleEdit = (item: User) => {
    setModalType("edit")
    handleShow()
    setSelected(item)
  }

  const filterChange = () => {
    const selectedVal = filterRef?.current?.value
    setFilterDelete(selectedVal)
    if (selectedVal === "true") {
      setFilteredUsers(
        allUsers.filter((user) => user.isDeleted === 1)
      )
    } else if (selectedVal === "false") {
      setFilteredUsers(
        allUsers.filter((user) => user.isDeleted === 0)
      )
    } else {
      setFilteredUsers(allUsers)
    }
  }

  useEffect(() => {
    filterChange()
  }, [allUsers])

  return (
    <AdminLayout>
      <AdminSectionHeader
        sectionName={t("Users")}
        handleAdd={handleAdd} />
      <hr />
      <AdmenFilterByDelete
        filterRef={filterRef}
        filterDelete={filterDelete}
        filterChange={filterChange} />
      <hr />
      <AdminTable tableTitles={tableTitles}
        items={filteredUsers}
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
              ? <UserForm rolesProps={rolesProps} type={modalType} item={selected} addItem={addItem} editItem={editItem} handleClose={handleClose} />
              : <UserForm rolesProps={rolesProps} type={modalType} item={{}} addItem={addItem} editItem={editItem} handleClose={handleClose} />
        } />
    </AdminLayout>
  )
}


export async function getServerSideProps(ctx:NextPageContext) {

  
  const cookie = ctx.req?.headers.cookie;
  const url = `${process.env.URL_ROOT}/api/users/all`;

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


  const res = await fetch(`${process.env.URL_ROOT}/api/users/all`)
  const users = await res.json()

  const resRoles = await fetch(`${process.env.URL_ROOT}/api/roles/notDeleted`)
  const roles = await resRoles.json()


  return {
    props: {
      usersProps: users,
      rolesProps: roles.map(r => ({id: r.r_id, role: r.r_role}))
    },
  }
}
