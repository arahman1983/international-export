import { useState } from "react"
import Brand from "../types/brands"
import Category from "../types/categories"

export default function FilteredProducts({filterProducts, type, q}) {
  const [filterTitle, setFilterTitle] = useState<string>("")
  const [filterBrand, setFilterBrand] = useState<string>("")
  const [filterCategory, setFilterCategory] = useState<string>("")
  
  const changeTitle = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFilterTitle(e.target.value)
    filterProducts(e.target.value,filterBrand,filterCategory )
  }
  const changeBrand = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFilterBrand(e.target.value)
    filterProducts(filterTitle,e.target.value,filterCategory )
    
  }
  const changeCategory = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFilterCategory(e.target.value)
    filterProducts(filterTitle,filterBrand,e.target.value )
    
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
        <input className="form-control" type="text" placeholder="Filter by title" value={filterTitle} onChange={changeTitle} />
      </div>
      <div className="col-md-3">
        <input list="brands" className="form-control"  placeholder="Filter by brand" value={filterBrand} onChange={changeBrand} />
        <datalist id="brands">
          {
            brands && brands.map((brand:Brand, i:number) => <option value={brand.name} />)
          }
        </datalist>
      </div>
      <div className="col-md-3">
      <input list="categories" className="form-control" placeholder="Filter by category" value={filterCategory} onChange={changeCategory}/>
        <datalist id="categories">
        {
            categories && categories.map((category:Category, i:number) => <option value={category.name} />)
          }
        </datalist>
      </div>
    </div >
  )
}