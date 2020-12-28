import { useState, useRef } from "react"
import Brand from "../types/brands"
import Category from "../types/categories"
import { useRouter } from 'next/router'

export default function FilteredProducts({ filterProducts, type, q }) {
  const router = useRouter()
  const [filterTitle, setFilterTitle] = useState<string>("")
  const [filterBrand, setFilterBrand] = useState<string>(router.query?.type === 'brand' ? router.query?.q?.toString() : "")
  const [filterCategory, setFilterCategory] = useState<string>(router.query?.type === 'category' ? router.query?.q?.toString() : "")
  const titleFilter = useRef<HTMLInputElement>()
  const brandFilter = useRef<HTMLInputElement>()
  const categoryFilter = useRef<HTMLInputElement>()

  const changeTitle = () => {
    let title = titleFilter.current.value
    setFilterTitle(title)
    filterProducts(title, filterBrand, filterCategory)
  }
  const changeBrand = () => {
    let brand = brandFilter.current.value
    setFilterBrand(brand)
    filterProducts(filterTitle, brand, filterCategory)

  }
  const changeCategory = () => {
    let category = categoryFilter.current.value
    setFilterCategory(category)
    filterProducts(filterTitle, filterBrand, category)
  }


  // get brand and category
  const [brands] = useState<Brand[]>([
    {
      id: "1",
      name: "Toyota",
      image: "/images/toyota.png"
    },
    {
      id: "2",
      name: "Renault",
      image: "/images/rino.png"
    },
    {
      id: "3",
      name: "Hundy",
      image: "/images/huy.png"
    },
    {
      id: "4",
      name: "BYD",
      image: "/images/byd.png"
    },
    {
      id: "5",
      name: "BMW",
      image: "/images/bmw.png"
    }
  ])

  const [categories] = useState<Category[]>([
    {
      id: "1",
      name: "wheels"
    },
    {
      id: "2",
      name: "lamps"
    }
  ])
  return (
    <div className="row mx-0 my-3 py-3 bg-light">
      <div className="col-md-3">
        <h5 className="text-secondary">Filter Products</h5>
      </div>
      <div className="col-md-3">
        <input className="form-control" ref={titleFilter} type="text" placeholder="Filter by title" value = {filterTitle} onChange={changeTitle} />
      </div>
      <div className="col-md-3">
        <input list="brands" className="form-control" ref={brandFilter}  placeholder="Filter by brand" value = {filterBrand} onChange={changeBrand} />
        <datalist id="brands">
          {
            brands && brands.map((brand: Brand, i: number) => <option key={i} value={brand.name} />)
          }
        </datalist>
      </div>
      <div className="col-md-3">
        <input list="categories" className="form-control" ref={categoryFilter}  placeholder="Filter by category" value={filterCategory} onChange={changeCategory} />
        <datalist id="categories">
          {
            categories && categories.map((category: Category, i: number) => <option key={i} value={category.name} />)
          }
        </datalist>
      </div>
    </div >
  )
}