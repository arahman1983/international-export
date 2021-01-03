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


export default function SliderAdmin({ sliderProp }) {
  const { t } = useTranslation()

  const [allSlides, dispatchSlides] = useReducer(slidesReducer, sliderProp.map(slider => ({
    id: slider.id,
    title: slider.title,
    title_ar: slider.title_ar,
    image: <Image src={slider.image} width={300} height={'auto'} alt={slider.title} />,
    createdAt: slider.createdAt,
    updatedAt: slider.updatedAt,
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

  const confirmDelete = () => {
    /// API for Edit
    dispatchSlides(editSlide(selected.id, {
      id: selected.id,
      title: selected.title,
      title_ar: selected.title_ar,
      image: <Image src={selected.image} width={300} height={'auto'} alt={selected.title} />,
      createdAt: selected.createdAt,
      updatedAt: new Date().toLocaleString(),
      isDeleted: true

    }))
    handleClose()
  }

  const restoreItem = (item: AdminSlide) => {
    /// API for Edit
    dispatchSlides(editSlide(item.id, { ...item, updatedAt: new Date().toLocaleString(), isDeleted: false }))
    handleClose()
  }

  const editItem = (item: AdminSlide) => {
    /// API for Edit
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
  }

  const addItem = (item: AdminSlide) => {
    /// API for Add
    dispatchSlides(addSlide({ id: sliderProp.length + 1,
      title: item.title,
      title_ar: item.title_ar,
      image: item.image,
      // picFile: picFile,
      // description: item.description,
      // description_ar: item.description_ar,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      isDeleted: false
    }))
    handleClose()
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
      allSlides.filter((brand: AdminSlide) => brand.isDeleted === true)
    )
  } else if (selectedVal === "false") {
    setFilteredSlides(
      allSlides.filter((brand: AdminSlide) => brand.isDeleted === false)
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
      items={filteredSlides}
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


export async function getStaticProps() {
  //const res = await fetch('https://.../posts')
  //const about = await res.json()

  return {
    props: {
      sliderProp: [
        {
          id: 1,
          title: "First slide label",
          title_ar: "شريحة العرض الأولى",
          description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
          description_ar: ' ',
          image: '/images/slider.svg',
          createdAt: '2020-12-31 10:30:00',
          updatedAt: '2020-12-31 10:30:00',
          isDeleted: false
        },
        {
          id: 2,
          title: "Secpnd slide label",
          title_ar: "شريحة العرض الثانية",
          description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
          description_ar: ' ',
          image: '/images/slide2.jpeg',
          createdAt: '2020-12-31 10:30:00',
          updatedAt: '2020-12-31 10:30:00',
          isDeleted: false
        },
        {
          id: 3,
          title: "Third slide label",
          title_ar: "شريحة العرض الثالثة",
          description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
          description_ar: ' ',
          image: '/images/slide3.jpeg',
          createdAt: '2020-12-31 10:30:00',
          updatedAt: '2020-12-31 10:30:00',
          isDeleted: true
        },

      ]
    },
  }
}
