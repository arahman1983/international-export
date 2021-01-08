import { useState, useRef, useContext } from "react"
import Brand from "../types/brands"
import Category from "../types/categories"
import { useRouter } from 'next/router'
import {BrandsCategoriesContext} from './layout'

export default function FilteredProducts({ filterProducts, type, q }) {
  const [categoriesArray, BrandsArray] = useContext(BrandsCategoriesContext)
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
            BrandsArray && BrandsArray.map((brand: Brand, i: number) => <option key={i} value={brand.name} />)
          }
        </datalist>
      </div>
      <div className="col-md-3">
        <input list="categories" className="form-control" ref={categoryFilter}  placeholder="Filter by category" value={filterCategory} onChange={changeCategory} />
        <datalist id="categories">
          {
            categoriesArray && categoriesArray.map((category: Category, i: number) => <option key={i} value={category.name} />)
          }
        </datalist>
      </div>
    </div >
  )
}