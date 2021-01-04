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


export default function UsersAdmin({ usersProps, rolesProps }) {
  const { t } = useTranslation()

  const [allUsers, dispatchUsers] = useReducer(usersReducer, usersProps.map((user: User) => {
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isDeleted: user.isDeleted
    }
  }))
  const [filteredUsers, setFilteredUsers] = useState<User[]>(allUsers.filter((user: User) => !user.isDeleted))
  const [filterDelete, setFilterDelete] = useState<string | undefined>("false")
  const [modalType, setModalType] = useState<string | undefined>("add")
  const [selected, setSelected] = useState<User | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const filterRef = useRef<HTMLSelectElement>()

  let tableTitles = ['#', t('UserName'), t('EmailTitle'), t('Roles'), t('CrDate'), t('UpDate'), '']

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const confirmDelete = () => {
    /// API for Edit
    dispatchUsers(editUser(selected.id, { ...selected, isDeleted: true }))
    handleClose()
  }

  const restoreItem = (item: User) => {
    /// API for Edit
    dispatchUsers(editUser(item.id, { ...item, isDeleted: false }))
    handleClose()
  }

  const editItem = (item: User) => {
    /// API for Edit
    dispatchUsers(editUser(item.id, { ...item }))
    handleClose()
  }

  const addItem = async (item: User) => {
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
          role: item.role
        }),
      })
      const json = await res.json()
      if (!res.ok){
        console.log(json.message)
      } else {
        dispatchUsers(addUser({
          id: usersProps.length + 1,
          userName: item.userName,
          email: item.email,
          role: item.role,
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
          isDeleted: false
        }))
        handleClose()
      }

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
        allUsers.filter((user: User) => user.isDeleted === true)
      )
    } else if (selectedVal === "false") {
      setFilteredUsers(
        allUsers.filter((user: User) => user.isDeleted === false)
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


export async function getStaticProps() {
  //const res = await fetch('https://.../posts')
  //const about = await res.json()

  return {
    props: {
      usersProps: [
        {
          id: 1,
          userName: 'arahman',
          email: 'ar@nail.co',
          password: '6465546454rwerwerfew',
          role: 'Admin',
          createdAt: '2020-12-31 10:30:00',
          updatedAt: '2020-12-31 10:30:00',
          isDeleted: false
        },
        {
          id: 2,
          userName: 'aaa',
          email: 'aa@nail.co',
          password: '6465546454rwerwerfew',
          role: 'Content',
          createdAt: '2020-12-31 10:30:00',
          updatedAt: '2020-12-31 10:30:00',
          isDeleted: false
        },

      ],
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
