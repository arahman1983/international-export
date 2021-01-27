import { useState, useEffect, useRef, useReducer } from 'react'
import {
  AdminLayout, AdminSectionHeader, AdminTable, AdmenFilterByDelete,
  AdminModal, ConfirmDelete, SliderForm
} from '../../components'
import useTranslation from "../../locals/localHook"
import { AdminSlide } from '../../types/slider'
import slidesReducer from "../../reducers/slides/reducer";
import { addSlide, editSlide } from "../../reducers/slides/actions";
import Image from 'next/image'
import { NextPageContext } from 'next';
import  Router  from 'next/router';


export default function SliderAdmin({ sliderProp }) {
  const { t } = useTranslation()

  const [allSlides, dispatchSlides] = useReducer(slidesReducer, sliderProp.map(slider => ({
    id: slider.id,
    title: slider.title,
    title_ar: slider.title_ar,
    image: slider.image ,
    createdAt: slider.created_at,
    updatedAt: slider.updated_at,
    isDeleted: slider.isDeleted
  })))
  const [filteredSlides, setFilteredSlides] = useState<AdminSlide[]>(allSlides.filter((brand: AdminSlide) => !brand.isDeleted))
  const [filterDelete, setFilterDelete] = useState<string | undefined>("false")
  const [modalType, setModalType] = useState<string | undefined>("add")
  const [selected, setSelected] = useState<AdminSlide | undefined>()
  const [show, setShow] = useState<boolean>(false)
  const filterRef = useRef<HTMLSelectElement>()
  let tableTitles = ['#', t('Title'), t('ArTitle'), t('Image'), t('CrDate'), t('UpDate'), '']

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const fetchEdit = async (item) => {
    try {
      const res = await fetch('/api/slides/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item.id,
          title: item.title,
          title_ar: item.title_ar,
          image: item.image,
          description: item.description,
          description_ar: item.description_ar,
          isDeleted: item.isDeleted
        }),
      })

      const json = await res.json()
      if (!res.ok) throw Error(json.message)
    } catch (e) {
      throw Error(e.message)
    }
  }

  const confirmDelete = () => {
    /// API for Edit
    fetchEdit({...selected, isDeleted: 1}).then(()=>{
      dispatchSlides(editSlide(selected.id, {
        id: selected.id,
        title: selected.title,
        title_ar: selected.title_ar,
        image: selected.image,
        createdAt: selected.createdAt,
        updatedAt: new Date().toLocaleString(),
        isDeleted: 1
  
      }))
      handleClose()
    })
  }

  const restoreItem = (item: AdminSlide) => {
    /// API for Edit
    fetchEdit({...selected, isDeleted: 0}).then(()=>{
      dispatchSlides(editSlide(item.id, { ...item, updatedAt: new Date().toLocaleString(), isDeleted: 0 }))
      handleClose()
    })
  }


  const editItem = (item: AdminSlide) => {
    /// API for Edit
    fetchEdit(item).then(()=>{
      dispatchSlides(editSlide(item.id, { 
        id : item.id,
        title: item.title,
        title_ar: item.title_ar,
        image: item.image,
        createdAt: item.createdAt,
        updatedAt: new Date().toLocaleString(),
        isDeleted: item.isDeleted
      }))
      handleClose()
    })
  }

  const addItem = async (item: AdminSlide) => {
    /// API for Add
    try {
      const res = await fetch('/api/slides/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: item.title,
          title_ar: item.title_ar,
          image: item.image,
          description: item.description,
          description_ar: item.description_ar,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      dispatchSlides(addSlide({ 
        id: json.insertId,
        title: item.title,
        title_ar: item.title_ar,
        // picFile: picFile,
        description: item.description,
        description_ar: item.description_ar,
        image: item.image,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        isDeleted: 0
      }))
      handleClose()
    } catch (e) {
      throw Error(e.message)
    }
}

const handleAdd = () => {
  setModalType("add")
  handleShow()
}

const handleDelete = (item: AdminSlide) => {
  setModalType("delete")
  handleShow()
  setSelected(sliderProp.find((slide: AdminSlide) => slide.id === item.id))
}

const handleEdit = (item: AdminSlide) => {
  setModalType("edit")
  handleShow()
  setSelected(sliderProp.find((slide: AdminSlide) => slide.id === item.id))
}

const filterChange = () => {
  const selectedVal = filterRef?.current?.value
  setFilterDelete(selectedVal)
  if (selectedVal === "true") {
    setFilteredSlides(
      allSlides.filter((brand: AdminSlide) => brand.isDeleted === 1)
    )
  } else if (selectedVal === "false") {
    setFilteredSlides(
      allSlides.filter((brand: AdminSlide) => brand.isDeleted === 0)
    )
  } else {
    setFilteredSlides(allSlides)
  }
}

useEffect(() => {
  filterChange()
}, [allSlides])

return (
  <AdminLayout>
    <AdminSectionHeader
      sectionName={t("Slide")}
      handleAdd={handleAdd} />
    <hr />
    <AdmenFilterByDelete
      filterRef={filterRef}
      filterDelete={filterDelete}
      filterChange={filterChange} />
    <hr />
    <AdminTable tableTitles={tableTitles}
      items={filteredSlides.map(pro => {
        return ({
          id: pro.id,
          title: pro.title,
          title_ar: pro.title_ar,
          image : <img src={pro.image} width={300} height={100} alt={pro.title} />,
          createdAt: pro.createdAt,
          updatedAt: pro.updatedAt,
          isDeleted: pro.isDeleted
        
        })
      })}
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
            ? <SliderForm type={modalType} item={selected} addItem={addItem} editItem={editItem} handleClose={handleClose} />
            : <SliderForm type={modalType} item={{}} addItem={addItem} editItem={editItem} handleClose={handleClose} />
      } />
  </AdminLayout>
)
}


export async function getServerSideProps(ctx:NextPageContext) {

  const cookie = ctx.req?.headers.cookie;
  const url = `${process.env.URL_ROOT}/api/slides/all`;
  
  const resp = await fetch(url,{headers: {cookie: ctx.req.headers.cookie}});

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

  const sliderProp = await resp.json()

  return {
    props: {
      sliderProp : sliderProp ? sliderProp : []
    },
  }
}
